const express = require("express");
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/eCoalDB');

const jwt = require('jsonwebtoken');

// vérifier l'existence du user et la validité du password.
// si ok => next
// sinon : retourner un code d'erreur au client

function checkUserPassword(user, res, next) {
    console.log("... recherche name=", user.username, " password=", user.password);
    db.get(
        'select 1 from users where name=? and password=?',
        [user.username, user.password],
        (err, row) => {
            console.log('check database');
            if (err) {
                console.log("err : ", err);
                res.status(500).end();
            } else {
                console.log('check : ', row);
                if (row) {
                    console.log('check ok : ', row);
                    next();
                } else {
                    console.log('user unknown');
                    res.status(422).end();
                }
            }
        }
    );
}

// vérifier que le body est bien formé lors de l'envoi d'un formulaire POST
function checkBodyUser(req, res, next) {
    console.log("checkBodyUser....");
    if (!req.body || !req.body.username || !req.body.password) {
        console.log("...body incorrect : ", req.body);
        res.status(422).end()
    } else {
        next()
    }
}

// contruire et envoyer un token au client à partir du nom, du password et du mot secret
function sendToken(req, res) {
    const user = req.body;
    const token = jwt.sign({
        username: user.username,
        password: user.password
    }, 'secret', {expiresIn: '1h'});
    console.log("send token", token);
    res.status(200).json({'token': token});
}

// vérifier l'authenticité du l'entête pour tout accès sécurisé à l'API
// si entête valide (jeton dans req.headers.authorization) => vérification du user dans la BD
// si tout est ok => next
// sinon : retourner un code d'erreur au client
function verify(req, res, next) {
    if (!req.headers || !req.headers.authorization) {
        console.log('header non conforme :', req.headers);
        res.status(401).end();
        return;
    }
    const auth = req.headers.authorization.split(' ');
    if (auth.length !== 2 || auth[0] !== 'Bearer') {
        console.log('headers.authorization non conforme : ', auth);
        res.status(401).end();
        return;
    }

    jwt.verify(auth[1], 'secret',
        (err) => {
            if (err) {
                console.log('token err : ', err);
                console.log('bad token = ', auth);
                res.status(401).end();
                return;
            }
            const decoded = jwt.decode(auth[1]);
            console.log('token ok : ', decoded);
            checkUserPassword(decoded, res, next);
        })
}

// les routes valides du server
router
    .post("/signin", checkBodyUser, (req, res, next) => {
        checkUserPassword(req.body, res, next)
    }, sendToken)
    .post("/signUp", checkBodyUser, (req, res) => {
        console.log("signup....");
        db.get(
            'select 1 from users where name=?', req.body.username,
            (err, row) => {
                if (err) {
                    console.log("err : ", err);
                    res.status(500).end();
                } else {
                    if (row) {
                        console.log("déja connu : ", row);
                        res.status(403).end();
                    } else {
                        console.log("ok pour création : ", req.body.username);
                        db.run('insert into users(name,password) values(?,?)', [req.body.username, req.body.password],
                            (err) => {
                                if (err) {
                                    console.log("err :: ", err);
                                    res.status(500).end();
                                } else {
                                    console.log("created : ", req.body.username);
                                    //res.status(201).end();
                                    sendToken(req, res);
                                }
                            }
                        );
                    }
                }

            }
        )
    });

module.exports.verify=verify;
module.exports.router=router;
