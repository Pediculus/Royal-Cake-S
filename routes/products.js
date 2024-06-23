var express = require('express');
var router = express.Router();
var connection = require('../library/database');
var { isAuthenticated, isAdmin } = require('../middleware/auth');

/**
 * INDEX POSTS
 */
router.get('/', isAuthenticated, isAdmin, function (req, res, next) {
    connection.query('SELECT * FROM cake ORDER BY cake_id asc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('products', {
                data: ''
            });
        } else {
            res.render('products/index', {
                data: rows
            });
        }
    });
});

/**
 * CREATE POST
 */
router.get('/create', isAuthenticated, isAdmin, function (req, res, next) {
    res.render('products/create', {
        cake_name: '',
        price: '',
        description: '',
    });
});

/**
 * STORE POST
 */
router.post('/store', isAuthenticated, isAdmin, function (req, res, next) {
    let cake_name = req.body.cake_name;
    let price = req.body.price;
    let description = req.body.description;
    let errors = false;

    if (cake_name.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Title");
        res.render('products/create', {
            cake_name: cake_name,
            price: price,
            description: description,
        });
    }

    if (price.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Konten");
        res.render('products/create', {
            cake_name: cake_name,
            price: price,
            description: description,
        });
    }

    if (!errors) {
        let formData = {
            cake_name: cake_name,
            price: price,
            description: description,
        };

        connection.query('INSERT INTO cake SET ?', formData, function (err, result) {
            if (err) {
                req.flash('error', err);
                res.render('products/create', {
                    cake_name: formData.cake_name,
                    price: formData.price,
                    description: formData.description,
                });
            } else {
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/products');
            }
        });
    }
});

/**
 * EDIT POST
 */
router.get('/edit/(:id)', isAuthenticated, isAdmin, function (req, res, next) {
    let id = req.params.id;

    connection.query('SELECT * FROM cake WHERE cake_id = ' + id, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length <= 0) {
            req.flash('error', 'Data Post Dengan ID ' + id + " Tidak Ditemukan");
            res.redirect('/products');
        } else {
            res.render('products/edit', {
                cake_id: rows[0].cake_id,
                cake_name: rows[0].cake_name,
                price: rows[0].price,
                description: rows[0].description,
            });
        }
    });
});

/**
 * UPDATE POST
 */
router.post('/update/:id', isAuthenticated, isAdmin, function (req, res, next) {
    let cake_id = req.params.id;
    let cake_name = req.body.cake_name;
    let price = req.body.price;
    let description = req.body.description;
    let errors = false;

    if (cake_name.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Title");
        res.render('products/edit', {
            cake_id: cake_id,
            cake_name: cake_name,
            price: price,
            description: description,
        });
    }

    if (price.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Konten");
        res.render('products/edit', {
            cake_id: cake_id,
            cake_name: cake_name,
            price: price,
            description: description,
        });
    }

    if (!errors) {
        let formData = {
            cake_name: cake_name,
            price: price,
            description: description,
        };

        connection.query('UPDATE cake SET ? WHERE cake_id = ?', [formData, cake_id], function (err, result) {
            if (err) {
                req.flash('error', err);
                res.render('products/edit', {
                    cake_id: cake_id,
                    cake_name: formData.cake_name,
                    price: formData.price,
                    description: formData.description,
                });
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/products');
            }
        });
    }
});

/**
 * DELETE POST
 */
router.get('/delete/(:id)', isAuthenticated, isAdmin, function (req, res, next) {
    let id = req.params.id;

    connection.query('DELETE FROM cake WHERE cake_id = ' + id, function (err, result) {
        if (err) {
            req.flash('error', err);
            res.redirect('/products');
        } else {
            req.flash('success', 'Data Berhasil Dihapus!');
            res.redirect('/products');
        }
    });
});

/**
 * LOGOUT
 */
router.get('/logout', function (req, res, next) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Failed to logout');
        }
        res.redirect('/');
    });
});

module.exports = router;

module.exports = router;