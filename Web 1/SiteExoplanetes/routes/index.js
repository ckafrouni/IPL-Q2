const express = require('express');
const router = express.Router();

const exoplanetesList = [
    {
        id: 1,
        uniqueName: 'TRAPPIST-1 d',
        hClass: 'Mésoplanète',
        discoveryYear: '2016'
    },
    {
        id: 2,
        uniqueName: 'KOI-1686.01',
        hClass: 'Mésoplanète',
        discoveryYear: '2011'
    },
    {
        id: 3,
        uniqueName: 'Kepler-438 b',
        hClass: 'Mésoplanète',
        discoveryYear: '2015'
    },
    {
        id: 3,
        uniqueName: 'KOI-2418.01',
        hClass: 'Psychroplanète',
        discoveryYear: '2011'
    }
];

/* GET home page. */
router.get('/', (req, res) => {
    const today = new Date();
    /* Attention Date.now() est tentant mais renvoie une valeur numérique et non un objet Date
    donc impossible de faire ceci par exemple
    let now = Date.now();
    now.getFullYear()*/
    const todayString = "Nous sommes le " + today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear() + ".";
    const hourtodayString = "Il est " + today.getHours() + ":" + today.getMinutes() + " à Bruxelles";
    // today -> name of variable to pass to hbs
    // after : -> concatenation of two string as value of today
    res.render('index.hbs', {today: todayString + " " + hourtodayString});
});

/* GET exolunes page. */
router.get('/exolunes', (req, res) => {
    // Exolunes list variable
    const exolunesList = ['DH Tauri', 'Kepler-409', 'WASP-49'];
    // pass Exolunes list to view
    res.render('exolunes.hbs', {exolunesList});
});

/* GET exoplanetes page. */
router.get('/exoplanetes', (req, res) => {
    let lst = exoplanetesList;

    /*if (req.query && req.query.uniqueName) {
        lst = exoplanetesList.filter((exoplanet) => {
            return exoplanet.uniqueName.toLowerCase().indexOf(req.query.uniqueName.toLowerCase()) >= 0;
        });
    }*/

    res.render(
        'exoplanetes.hbs',
        {
            lst,
            query: req.query
        }
    );
});

router.get('/exoplanetes/details', (req, res) => {
    if (req.query && req.query.id) {
        let id = parseInt(req.query.id);
    }

    res.render('exoplanete_details.hbs', {msg: "Vous n'avez pas spécifier de 'id'"});
});

router.post('/exoplanetes', (req, res) => {
    exoplanetesList.push(
        {
            id: exoplanetesList[exoplanetesList.length - 1].id + 1,
            ...req.body
        }
    );

    res.render('exoplanetes.hbs', {exoplanetesList});
});

module.exports = router;
