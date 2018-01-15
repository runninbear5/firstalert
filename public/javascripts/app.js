$(document).ready(function() {

    function goToPage(obj, datum) {
        var team_re = datum.match(/(\d+) [|] .+/);
        null != team_re && (team_key = team_re[1], url = "/teams/teamSearch?q=" + team_key, window.location.href = url)
    }

    function teamFilter(data) {
        for (var to_return = [], i = 0; i < data.length; i++) to_return.push({
            value: data[i],
            tokens: cleanUnicode(data[i]).split(" ")
        });
        return to_return
    }

    var teams = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: '../data/teams.json'
    });

    $(".typeahead").attr("autocomplete", "off");

    $(".typeahead").typeahead(null, {
        name: "teams",
        source: teams
    });

    $(".typeahead").bind("typeahead:selected", goToPage);
    $(".typeahead").bind("typeahead:autocompleted", goToPage);
    $(".typeahead").keypress(function(event) {
        13 == event.which && this.form.submit()
    });
});
