var request = require('request');
var config = require('../config')

var Team = require('../models/team');

exports.populateTeams = function(req, res, next) {

    var startPageNum = 0;

    upsertTeams(startPageNum, function() {
        res.send('Done');
    });
};

// private methods
function upsertTeams(page, next) {

    var updateOptions = { upsert: true, new: true, setDefaultsOnInsert: true };

    var url = `${config.tba.api_url}/teams/${page}`;

    request(url, { headers: {'X-TBA-Auth-Key': config.tba.api_key} }, function(err, rsp, body) {
        var teams = JSON.parse(body);

        if (teams.length > 0 ) {
            teams.forEach(team => {
                var query = { _id: team.key };

                var update = {
                    _id: team.key,
                    city: team.city,
                    country: team.country,
                    key: team.key,
                    name: team.name,
                    nickname: team.nickname,
                    state_prov: team.state_prov,
                    team_number: team.team_number
                };

                // upsert the team
                Team.findByIdAndUpdate(query, update, updateOptions, function(error, result) {
                    if (error) return;
                });
            });
            console.log(page);
            page += 1;
            upsertTeams(page, next);
        }
        else {
            next();
        }
    });
};
