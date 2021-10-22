$(document).ready(function () {
    console.log('Take Pokemon Information');

    const urlPokemons = 'https://pokeapi.co/api/v2/pokemon/';
    console.log('URL => ' + urlPokemons);

    getPokemons(urlPokemons);

    $("#getMorePokemons").click(function () {
        const urlNext = $(this).attr('nextPageUrl');
        getPokemons(urlNext);
    });

});

const getPhoto = (url, name) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            $(`#img_${name}`).attr(
                'src',
                data.sprites.other.dream_world.front_default
            );
        });
};

const getPokemons = (url) => {
    console.log('Get Pokemon from URL: ' + url);

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const pokemons = data.results;
            const urlMorePokemons = data.next;

            $('#getMorePokemons').attr('nextPageUrl', urlMorePokemons);

            pokemons.forEach(function (pokemon) {
                showPokemon(pokemon);
            });

            $('.btnGetDataPokemon').click(function () {
                const urlPokemon = $(this).attr('data-url-pokemon');
                getPokemonData(urlPokemon);
            });
        });
};

const getDamage = (url) => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        $('#modalPokemonDamageRelationLabel').text(data.name);
        $('#double_damage_from').text('');
        $('#double_damage_to').text('');
        $('#half_damage_from').text('');
        $('#half_damage_to').text('');
        $('#no_damage_from').text('');
        $('#no_damage_to').text('');

        data.damage_relations.double_damage_from.forEach(function (damage) {
            $('#double_damage_from').append(`<li class="">${damage.name}</li>`);  
        });

        data.damage_relations.double_damage_to.forEach(function (damage) {
            $('#double_damage_to').append(`<li class="">${damage.name}</li>`);  
        });

        data.damage_relations.half_damage_from.forEach(function (damage) {
            $('#half_damage_from').append(`<li class="">${damage.name}</li>`);  
        });

        data.damage_relations.half_damage_to.forEach(function (damage) {
            $('#half_damage_to').append(`<li class="">${damage.name}</li>`);  
        });

        data.damage_relations.no_damage_from.forEach(function (damage) {
            $('#no_damage_from').append(`<li class="">${damage.name}</li>`);  
        });

        data.damage_relations.no_damage_to.forEach(function (damage) {
            $('#no_damage_to').append(`<li class="">${damage.name}</li>`);  
        });    
    })
    .then(() => {
        $('#modalPokemonDamageRelation').modal('show');
    });
};

const getOthersPokemons = (url) => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        $('#modalGetOtherPokemonsLabel').text(data.name);
        $('#other_pokemons').text('');

        data.pokemon.forEach(function (p) {
            $('#other_pokemons').append(`<li class="">${p.pokemon.name}</li>`);  
        }); 
    })
    .then(() => {
        $('#modalGetOtherPokemons').modal('show');
    });
};

const getPokemonData = (url) => {
    console.log('Get Pokemon data from ' + url);

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            $('#modalPokemonLabel').text(data.name);

            $('#pokemonType').text('');
            $('#pokemonGenerations').text('');
            $('#pokemonAbilities').text('');
            $('#pokemonMoves').text('');

            data.types.forEach(function (type) {
                $('#pokemonType').append(`<li class="">${type.type.name} <button type="button" class="btn btn-primary btnDamageRelation" data-url-damage="${type.type.url}">Damage relations</button></li>`);
            });

            $('.btnDamageRelation').click(function () {
                const urlDamage = $(this).attr('data-url-damage');
                getDamage(urlDamage);
            });

            data.game_indices.forEach(function (generation) {
                $('#pokemonGenerations').append(
                    `<li class="">${generation.version.name}</li>`);
            });

            data.abilities.forEach(function (abilitiy) {
                $('#pokemonAbilities').append(
                    `<li class="">${abilitiy.ability.name} <button type="button" class="btn btn-warning btnOtherPokemons" data-url-other-pokemons="${abilitiy.ability.url}">Other Pokemons</button></li>`);
            });

            $('.btnOtherPokemons').click(function () {
                const urlOthersPokemons = $(this).attr('data-url-other-pokemons');
                getOthersPokemons(urlOthersPokemons);
            });

            for (let i = 0; i < 5; i++) {
                $('#pokemonMoves').append(
                    `<li class="">${data.moves[i].move.name}</li>`
                );
            }
            $('#modalPokemon').modal('show');
        });
};

const showPokemon = (pokemon) => {
    $('#pokedex').append(`
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${pokemon.name}</h5>
                <img src="" id="img_${pokemon.name}"" class="w-100">
                <button class="btn btn-pkm btnGetDataPokemon" data-url-pokemon="${pokemon.url}">I want to see more about this Pokemon</button>
            </div>
        </div>
    `);
    getPhoto(pokemon.url, pokemon.name);
};