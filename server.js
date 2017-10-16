const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const { User, Board, List, Card } = require("./models");
app.use(express.static(path.join(__dirname, "build")));

const morgan = require("morgan");
const morganToolkit = require("morgan-toolkit")(morgan);

app.use(morganToolkit());

// Session

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false
	})
);

// Body parser

app.use(bodyParser.json());

// Passport authentication

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require("passport-local").Strategy;

passport.use(
	new LocalStrategy({ usernameField: "email" }, function(
		email,
		password,
		done
	) {
		User.find({
			where: {
				email: email
			}
		}).then(user => {
			if (!user || !user.validatePassword(password)) {
				return done(null, false);
			}
			return done(null, user);
		});
	})
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id).then(user => {
		done(null, user);
	});
});

const loggedInOnly = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.end();
	}
};

// Login/Logout routes

app.get("/login", loggedInOnly, async (req, res) => {
	const boards = await Board.findAll({
		where: { userId: req.user.id },
		include: [{ model: List, include: [{ model: Card }] }],
		order: [
			["updatedAt", "DESC"],
			["title"],
			[List, "boardIndex"],
			[List, Card, "listIndex"]
		]
	});

	res.json({
		user: {
			id: req.user.id,
			username: req.user.username,
			email: req.user.email
		},
		boards: boards
	});
});

app.post("/login", passport.authenticate("local"), async (req, res) => {
	const boards = await Board.findAll({
		where: { userId: req.user.id },
		include: [
			{ model: List, include: [{ model: Card, where: { completed: false } }] }
		],
		order: [
			["updatedAt", "DESC"],
			["title"],
			[List, "boardIndex"],
			[List, Card, "listIndex"]
		]
	});

	res.json({
		user: {
			id: req.user.id,
			username: req.user.username,
			email: req.user.email
		},
		boards: boards
	});
});

app.delete("/logout", loggedInOnly, (req, res) => {
	req.logout();
	res.end();
});

// API routes
const api = require("./routes/api");

app.use("/api", loggedInOnly, api);

app.get("/*", (req, res) => {
	res.send(path.join(__dirname, "build/index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log("Now listening...");
});
