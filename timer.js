/**
 * Film Development Timer - Standalone Client
 * No backend required. All data and logic runs in the browser.
 */

// ============================================================================
// Film & Developer Data
// ============================================================================

var FILM_DEV_DATA = null;

var RAW_FALLBACK_RECIPES = [
    { film: "Ilford HP5 Plus 400", iso: 400, developer: "Super Purodoll (D-76 eq)", dilution: "1+1", time_seconds: 540, time_display: "9:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: false },
    { film: "Ilford HP5 Plus 400", iso: 400, developer: "Kodak XTOL", dilution: "1+1", time_seconds: 590, time_display: "9:50", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 5, agitation_cycle_s: 30, sharp: false },
    { film: "Ilford HP5 Plus 400", iso: 400, developer: "Fujifilm Microfine", dilution: "stock", time_seconds: 480, time_display: "8:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: true },
    { film: "Ilford FP4 Plus 125", iso: 125, developer: "Super Purodoll (D-76 eq)", dilution: "1+1", time_seconds: 600, time_display: "10:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: false },
    { film: "Ilford FP4 Plus 125", iso: 125, developer: "Kodak XTOL", dilution: "1+1", time_seconds: 600, time_display: "10:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 5, agitation_cycle_s: 30, sharp: false },
    { film: "Ilford FP4 Plus 125", iso: 125, developer: "Fujifilm Microfine", dilution: "stock", time_seconds: 450, time_display: "7:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: true },
    { film: "Ilford Delta 400", iso: 400, developer: "Super Purodoll (D-76 eq)", dilution: "1+1", time_seconds: 720, time_display: "12:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: false },
    { film: "Ilford Delta 400", iso: 400, developer: "Kodak XTOL", dilution: "1+1", time_seconds: 660, time_display: "11:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 5, agitation_cycle_s: 30, sharp: false },
    { film: "Ilford Delta 400", iso: 400, developer: "Fujifilm Microfine", dilution: "stock", time_seconds: 720, time_display: "12:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: true },
    { film: "Kentmere Pan 400", iso: 400, developer: "Super Purodoll (D-76 eq)", dilution: "1+1", time_seconds: 600, time_display: "10:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: false },
    { film: "Kentmere Pan 400", iso: 400, developer: "Kodak XTOL", dilution: "1+1", time_seconds: 600, time_display: "10:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 5, agitation_cycle_s: 30, sharp: false },
    { film: "Kentmere Pan 400", iso: 400, developer: "Fujifilm Microfine", dilution: "stock", time_seconds: 600, time_display: "10:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: true },
    { film: "Kentmere Pan 100", iso: 100, developer: "Super Purodoll (D-76 eq)", dilution: "1+1", time_seconds: 570, time_display: "9:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: false },
    { film: "Kentmere Pan 100", iso: 100, developer: "Kodak XTOL", dilution: "1+1", time_seconds: 570, time_display: "9:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 5, agitation_cycle_s: 30, sharp: false },
    { film: "Kentmere Pan 100", iso: 100, developer: "Fujifilm Microfine", dilution: "stock", time_seconds: 570, time_display: "9:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: true },
    { film: "Kodak Tri-X 400", iso: 400, developer: "Super Purodoll (D-76 eq)", dilution: "1+1", time_seconds: 585, time_display: "9:45", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: false },
    { film: "Kodak Tri-X 400", iso: 400, developer: "Kodak XTOL", dilution: "1+1", time_seconds: 570, time_display: "9:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 5, agitation_cycle_s: 30, sharp: false },
    { film: "Kodak Tri-X 400", iso: 400, developer: "Fujifilm Microfine", dilution: "stock", time_seconds: 510, time_display: "8:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: true },
    { film: "Kodak T-Max 400", iso: 400, developer: "Super Purodoll (D-76 eq)", dilution: "1+1", time_seconds: 660, time_display: "11:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: false },
    { film: "Kodak T-Max 400", iso: 400, developer: "Kodak XTOL", dilution: "1+1", time_seconds: 630, time_display: "10:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 5, agitation_cycle_s: 30, sharp: false },
    { film: "Kodak T-Max 400", iso: 400, developer: "Fujifilm Microfine", dilution: "stock", time_seconds: 570, time_display: "9:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: true },
    { film: "Lomography 400", iso: 400, developer: "Super Purodoll (D-76 eq)", dilution: "1+1", time_seconds: 600, time_display: "10:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: false },
    { film: "Lomography 400", iso: 400, developer: "Kodak XTOL", dilution: "1+1", time_seconds: 590, time_display: "9:50", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 5, agitation_cycle_s: 30, sharp: false },
    { film: "Lomography 400", iso: 400, developer: "Fujifilm Microfine", dilution: "stock", time_seconds: 480, time_display: "8:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: true },
    { film: "Lomography 100", iso: 100, developer: "Super Purodoll (D-76 eq)", dilution: "1+1", time_seconds: 570, time_display: "9:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: false },
    { film: "Lomography 100", iso: 100, developer: "Kodak XTOL", dilution: "1+1", time_seconds: 570, time_display: "9:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 5, agitation_cycle_s: 30, sharp: false },
    { film: "Lomography 100", iso: 100, developer: "Fujifilm Microfine", dilution: "stock", time_seconds: 420, time_display: "7:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: true },
    { film: "Yashica Mono 400", iso: 400, developer: "Super Purodoll (D-76 eq)", dilution: "1+1", time_seconds: 600, time_display: "10:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: false },
    { film: "Yashica Mono 400", iso: 400, developer: "Kodak XTOL", dilution: "1+1", time_seconds: 600, time_display: "10:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 5, agitation_cycle_s: 30, sharp: false },
    { film: "Yashica Mono 400", iso: 400, developer: "Fujifilm Microfine", dilution: "stock", time_seconds: 480, time_display: "8:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: true },
    { film: "Oriental Seagull 100", iso: 100, developer: "Super Purodoll (D-76 eq)", dilution: "1+1", time_seconds: 570, time_display: "9:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: false },
    { film: "Oriental Seagull 100", iso: 100, developer: "Kodak XTOL", dilution: "1+1", time_seconds: 570, time_display: "9:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 5, agitation_cycle_s: 30, sharp: false },
    { film: "Oriental Seagull 100", iso: 100, developer: "Fujifilm Microfine", dilution: "stock", time_seconds: 390, time_display: "6:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: true },
    { film: "Oriental Seagull 400", iso: 400, developer: "Super Purodoll (D-76 eq)", dilution: "1+1", time_seconds: 840, time_display: "14:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: false },
    { film: "Oriental Seagull 400", iso: 400, developer: "Kodak XTOL", dilution: "1+1", time_seconds: 720, time_display: "12:00", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 5, agitation_cycle_s: 30, sharp: false },
    { film: "Oriental Seagull 400", iso: 400, developer: "Fujifilm Microfine", dilution: "stock", time_seconds: 510, time_display: "8:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: true },
    { film: "SunBath Double X 200", iso: 200, developer: "Super Purodoll (D-76 eq)", dilution: "1+1", time_seconds: 570, time_display: "9:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: false },
    { film: "SunBath Double X 200", iso: 200, developer: "Kodak XTOL", dilution: "1+1", time_seconds: 570, time_display: "9:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 5, agitation_cycle_s: 30, sharp: false },
    { film: "SunBath Double X 200", iso: 200, developer: "Fujifilm Microfine", dilution: "stock", time_seconds: 510, time_display: "8:30", volume_ml: 350, agitation_start_s: 30, agitation_time_s: 10, agitation_cycle_s: 60, sharp: true }
];

function formatSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainder = seconds % 60;
    return minutes + ':' + (remainder < 10 ? '0' : '') + remainder;
}

function adjustTimeForTemperature(baseSeconds, tempC) {
    if (tempC === 20) return baseSeconds;
    var delta = tempC - 20;
    return Math.round(baseSeconds * Math.pow(0.9, delta));
}

function formatDurationLabel(seconds) {
    if (seconds < 60) return seconds + ' seconds';
    if (seconds % 60 === 0) {
        var minutes = seconds / 60;
        return minutes + (minutes === 1 ? ' minute' : ' minutes');
    }
    return formatSeconds(seconds);
}

function createId(parts) {
    return parts.join('-')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function buildNormalizedData(recipes) {
    var emulsionIndex = {};
    var filmIndex = {};
    var developerIndex = {};
    var emulsions = [];
    var films = [];
    var developers = [];
    var normalizedRecipes = [];

    for (var i = 0; i < recipes.length; i++) {
        var recipe = recipes[i];
        var filmKey = recipe.film + '|' + recipe.iso;
        var developerKey = recipe.developer;
        var emulsionId = emulsionIndex[filmKey];
        var filmId = filmIndex[filmKey];
        var developerId = developerIndex[developerKey];

        if (!emulsionId) {
            emulsionId = createId([recipe.film, recipe.iso]);
            emulsionIndex[filmKey] = emulsionId;
            emulsions.push({
                id: emulsionId,
                name: recipe.film,
                iso: recipe.iso
            });
        }

        if (!filmId) {
            filmId = createId([recipe.film, recipe.iso]);
            filmIndex[filmKey] = filmId;
            films.push({
                id: filmId,
                name: recipe.film,
                emulsionId: emulsionId
            });
        }

        if (!developerId) {
            developerId = createId([recipe.developer]);
            developerIndex[developerKey] = developerId;
            developers.push({
                id: developerId,
                name: recipe.developer
            });
        }

        normalizedRecipes.push({
            id: createId([recipe.film, recipe.iso, recipe.developer, recipe.dilution]),
            emulsionId: emulsionId,
            developerId: developerId,
            dilution: recipe.dilution,
            timeSeconds: recipe.time_seconds,
            volumeMl: recipe.volume_ml,
            sharp: recipe.sharp,
            agitation: {
                initialSeconds: recipe.agitation_start_s,
                durationSeconds: recipe.agitation_time_s,
                cycleSeconds: recipe.agitation_cycle_s
            }
        });
    }

    return {
        schemaVersion: 2,
        emulsions: emulsions,
        films: films,
        developers: developers,
        recipes: normalizedRecipes,
        workflowDefaults: {
            stopBath: {
                name: 'Stop Bath',
                transitionName: 'Pour Stop Bath',
                transitionChemical: 'Dump developer, fill with stop bath',
                chemical: 'Stop bath solution',
                timeSeconds: 30,
                volumeMl: 350,
                temperature: 'Room temp',
                agitation: { initialSeconds: 30, durationSeconds: 0, cycleSeconds: 0 }
            },
            waterBath: {
                name: 'Water Bath',
                transitionName: 'Pour Water Bath',
                transitionChemical: 'Dump developer, fill with water',
                chemical: 'Water rinse',
                timeSeconds: 30,
                volumeMl: 350,
                temperature: 'Room temp',
                agitation: { initialSeconds: 30, durationSeconds: 0, cycleSeconds: 0 }
            },
            fixerTransitionChemical: {
                stopBath: 'Dump stop bath, fill with fixer',
                waterBath: 'Dump water, fill with fixer'
            },
            fixer: {
                name: 'Fixer',
                transitionName: 'Pour Fixer',
                transitionChemical: 'Dump stop bath, fill with fixer',
                chemical: 'Super Fujifix-L',
                timeSeconds: 300,
                volumeMl: 350,
                temperature: '20°C',
                agitation: { initialSeconds: 30, durationSeconds: 10, cycleSeconds: 60 }
            },
            wash: {
                name: 'Wash',
                transitionName: 'Start Wash',
                transitionChemical: 'Dump fixer, start running water',
                chemical: 'Running water',
                timeSeconds: 300,
                volumeMl: 0,
                temperature: 'Room temp',
                agitation: { initialSeconds: 0, durationSeconds: 0, cycleSeconds: 0 }
            },
            wettingAgent: {
                name: 'Final Rinse',
                transitionName: 'Pour Final Rinse',
                transitionChemical: 'Stop water, fill with Driwel',
                chemical: 'Driwel',
                timeSeconds: 30,
                volumeMl: 350,
                temperature: 'Room temp',
                agitation: { initialSeconds: 0, durationSeconds: 0, cycleSeconds: 0 }
            }
        }
    };
}

function normalizeDataSchema(data) {
    if (Array.isArray(data)) return buildNormalizedData(data);
    if (data && data.schemaVersion === 2 && Array.isArray(data.emulsions)) {
        return data;
    }
    if (data && data.schemaVersion === 1 && Array.isArray(data.films) && Array.isArray(data.recipes)) {
        var emulsions = [];
        var films = [];
        var recipes = [];
        for (var i = 0; i < data.films.length; i++) {
            var f = data.films[i];
            emulsions.push({ id: f.id, name: f.name, iso: f.iso });
            films.push({ id: f.id, name: f.name, emulsionId: f.id });
        }
        for (var j = 0; j < data.recipes.length; j++) {
            var r = data.recipes[j];
            recipes.push({
                id: r.id, emulsionId: r.filmId, developerId: r.developerId,
                dilution: r.dilution, timeSeconds: r.timeSeconds, volumeMl: r.volumeMl,
                sharp: r.sharp, agitation: r.agitation
            });
        }
        return {
            schemaVersion: 2, emulsions: emulsions, films: films,
            developers: data.developers, recipes: recipes,
            workflowDefaults: data.workflowDefaults
        };
    }
    throw new Error('Unsupported data schema');
}

function loadDeveloperMatrix(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                FILM_DEV_DATA = normalizeDataSchema(JSON.parse(xhr.responseText));
                console.log('Loaded data.json schema v' + FILM_DEV_DATA.schemaVersion + ' (' + FILM_DEV_DATA.recipes.length + ' recipes)');
            } catch (e) {
                console.warn('Failed to parse data.json, using fallback data');
                FILM_DEV_DATA = buildNormalizedData(RAW_FALLBACK_RECIPES);
            }
        } else {
            console.warn('data.json not found (HTTP ' + xhr.status + '), using fallback data');
            FILM_DEV_DATA = buildNormalizedData(RAW_FALLBACK_RECIPES);
        }
        callback();
    };
    xhr.onerror = function() {
        console.warn('Could not fetch data.json, using fallback data');
        FILM_DEV_DATA = buildNormalizedData(RAW_FALLBACK_RECIPES);
        callback();
    };
    xhr.send();
}

// ============================================================================
// Data Service (replaces API calls)
// ============================================================================

var DataService = {
    getFilms: function() {
        var films = [];
        for (var i = 0; i < FILM_DEV_DATA.films.length; i++) {
            var film = FILM_DEV_DATA.films[i];
            var emulsion = this.getEmulsionById(film.emulsionId);
            films.push({
                id: film.id,
                name: film.name,
                iso: emulsion.iso,
                display: film.name + ' (ISO ' + emulsion.iso + ')'
            });
        }
        return films;
    },

    getDevelopers: function(filmId) {
        var film = this.getFilmById(filmId);
        if (!film) return [];
        var developers = [];
        for (var i = 0; i < FILM_DEV_DATA.recipes.length; i++) {
            var recipe = FILM_DEV_DATA.recipes[i];
            if (recipe.emulsionId === film.emulsionId) {
                var developer = this.getDeveloperById(recipe.developerId);
                developers.push({
                    id: recipe.id,
                    developerId: recipe.developerId,
                    name: developer.name,
                    dilution: recipe.dilution,
                    time_seconds: recipe.timeSeconds,
                    time_display: formatSeconds(recipe.timeSeconds),
                    agitation_start_s: recipe.agitation.initialSeconds,
                    agitation_time_s: recipe.agitation.durationSeconds,
                    agitation_cycle_s: recipe.agitation.cycleSeconds,
                    sharp: recipe.sharp,
                    display: developer.name + ' (' + recipe.dilution + ')'
                });
            }
        }
        return developers;
    },

    getFilmById: function(filmId) {
        for (var i = 0; i < FILM_DEV_DATA.films.length; i++) {
            if (FILM_DEV_DATA.films[i].id === filmId) return FILM_DEV_DATA.films[i];
        }
        return null;
    },

    getDeveloperById: function(developerId) {
        for (var i = 0; i < FILM_DEV_DATA.developers.length; i++) {
            if (FILM_DEV_DATA.developers[i].id === developerId) return FILM_DEV_DATA.developers[i];
        }
        return null;
    },

    getEmulsionById: function(emulsionId) {
        for (var i = 0; i < FILM_DEV_DATA.emulsions.length; i++) {
            if (FILM_DEV_DATA.emulsions[i].id === emulsionId) return FILM_DEV_DATA.emulsions[i];
        }
        return null;
    },

    getRecipeById: function(recipeId) {
        for (var i = 0; i < FILM_DEV_DATA.recipes.length; i++) {
            if (FILM_DEV_DATA.recipes[i].id === recipeId) return FILM_DEV_DATA.recipes[i];
        }
        return null;
    },

    getTimerConfig: function(recipeId, filmId, tempC, useStopBath, includeWettingAgent) {
        var recipe = this.getRecipeById(recipeId);
        if (!recipe) return null;
        var film = this.getFilmById(filmId);
        var emulsion = this.getEmulsionById(recipe.emulsionId);
        var developer = this.getDeveloperById(recipe.developerId);
        var workflow = FILM_DEV_DATA.workflowDefaults;

        var steps = [];
        var stepNum = 1;

        var adjustedTime = adjustTimeForTemperature(recipe.timeSeconds, tempC);
        steps.push({
            step: stepNum, name: 'Developer',
            chemical: developer.name + ' (' + recipe.dilution + ')',
            time_seconds: adjustedTime, time_display: formatSeconds(adjustedTime),
            volume_ml: recipe.volumeMl, temperature: tempC + '°C',
            agitation: { start_seconds: recipe.agitation.initialSeconds, cycle_seconds: recipe.agitation.cycleSeconds, duration_seconds: recipe.agitation.durationSeconds },
            is_transition: false
        });
        stepNum++;

        var bathConfig = useStopBath ? workflow.stopBath : workflow.waterBath;
        steps.push({
            step: stepNum, name: bathConfig.transitionName,
            chemical: bathConfig.transitionChemical,
            time_seconds: 30, time_display: formatDurationLabel(30), volume_ml: 0, temperature: '',
            agitation: { start_seconds: 0, cycle_seconds: 0, duration_seconds: 0 },
            is_transition: true
        });
        stepNum++;
        steps.push({
            step: stepNum, name: bathConfig.name,
            chemical: bathConfig.chemical,
            time_seconds: bathConfig.timeSeconds, time_display: formatDurationLabel(bathConfig.timeSeconds), volume_ml: bathConfig.volumeMl, temperature: bathConfig.temperature,
            agitation: { start_seconds: bathConfig.agitation.initialSeconds, cycle_seconds: bathConfig.agitation.cycleSeconds, duration_seconds: bathConfig.agitation.durationSeconds },
            is_transition: false
        });
        stepNum++;

        var fixer = workflow.fixer;
        var transitionChemical = useStopBath ? workflow.fixerTransitionChemical.stopBath : workflow.fixerTransitionChemical.waterBath;
        steps.push({
            step: stepNum, name: fixer.transitionName, chemical: transitionChemical,
            time_seconds: 30, time_display: formatDurationLabel(30), volume_ml: 0, temperature: '',
            agitation: { start_seconds: 0, cycle_seconds: 0, duration_seconds: 0 },
            is_transition: true
        });
        stepNum++;

        steps.push({
            step: stepNum, name: fixer.name, chemical: fixer.chemical,
            time_seconds: fixer.timeSeconds, time_display: formatDurationLabel(fixer.timeSeconds), volume_ml: fixer.volumeMl, temperature: fixer.temperature,
            agitation: { start_seconds: fixer.agitation.initialSeconds, cycle_seconds: fixer.agitation.cycleSeconds, duration_seconds: fixer.agitation.durationSeconds },
            is_transition: false
        });
        stepNum++;

        var wash = workflow.wash;
        steps.push({
            step: stepNum, name: wash.transitionName, chemical: wash.transitionChemical,
            time_seconds: 30, time_display: formatDurationLabel(30), volume_ml: 0, temperature: '',
            agitation: { start_seconds: 0, cycle_seconds: 0, duration_seconds: 0 },
            is_transition: true
        });
        stepNum++;

        steps.push({
            step: stepNum, name: wash.name, chemical: wash.chemical,
            time_seconds: wash.timeSeconds, time_display: formatDurationLabel(wash.timeSeconds), volume_ml: wash.volumeMl, temperature: wash.temperature,
            agitation: { start_seconds: wash.agitation.initialSeconds, cycle_seconds: wash.agitation.cycleSeconds, duration_seconds: wash.agitation.durationSeconds },
            is_transition: false
        });
        stepNum++;

        if (includeWettingAgent) {
            var wettingAgent = workflow.wettingAgent;
            steps.push({
                step: stepNum, name: wettingAgent.transitionName, chemical: wettingAgent.transitionChemical,
                time_seconds: 30, time_display: formatDurationLabel(30), volume_ml: 0, temperature: '',
                agitation: { start_seconds: 0, cycle_seconds: 0, duration_seconds: 0 },
                is_transition: true
            });
            stepNum++;
            steps.push({
                step: stepNum, name: wettingAgent.name, chemical: wettingAgent.chemical,
                time_seconds: wettingAgent.timeSeconds, time_display: formatDurationLabel(wettingAgent.timeSeconds), volume_ml: wettingAgent.volumeMl, temperature: wettingAgent.temperature,
                agitation: { start_seconds: wettingAgent.agitation.initialSeconds, cycle_seconds: wettingAgent.agitation.cycleSeconds, duration_seconds: wettingAgent.agitation.durationSeconds },
                is_transition: false
            });
        }

        return {
            recipeId: recipe.id,
            filmId: film.id,
            emulsionId: emulsion.id,
            developerId: developer.id,
            film: film.name, iso: emulsion.iso,
            developer: developer.name, dilution: recipe.dilution,
            sharp: recipe.sharp, tempC: tempC,
            baseTimeSeconds: recipe.timeSeconds, steps: steps
        };
    }
};

// ============================================================================
// Audio System
// ============================================================================

class AudioSystem {
    constructor() {
        this.audioContext = null;
        this.isInitialized = false;
        this.agitationNodes = null;
        this.toneType = 'tick';
        this.agitationMuted = false;
        this.masterGain = null;
        this.allMuted = false;
        this._unlockOnInteraction = this._unlockOnInteraction.bind(this);
        document.addEventListener('touchstart', this._unlockOnInteraction, true);
        document.addEventListener('click', this._unlockOnInteraction, true);
    }

    _unlockOnInteraction() {
        if (this.isInitialized) return;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // iOS 12 / iPhone 6 needs an explicit resume inside the user gesture
            // in addition to the silent buffer source unlock.
            try {
                var resumed = this.audioContext.resume && this.audioContext.resume();
                if (resumed && typeof resumed.then === 'function') { resumed.catch(function() {}); }
            } catch (e) {}
            var buffer = this.audioContext.createBuffer(1, 1, 22050);
            var source = this.audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(this.audioContext.destination);
            source.start(0);
            this.isInitialized = true;
            document.removeEventListener('touchstart', this._unlockOnInteraction, true);
            document.removeEventListener('click', this._unlockOnInteraction, true);
        } catch (e) {}
    }

    async init() {
        if (this.isInitialized) return;
        try {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
            this.isInitialized = true;
        } catch (e) {
            console.error('Failed to initialize audio:', e);
        }
    }

    async ensureAudioContext() {
        if (!this.audioContext) return false;
        if (this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
            } catch (e) {
                return false;
            }
        }
        return this.audioContext.state === 'running';
    }

    setToneType(type) { this.toneType = type; }
    setAllMuted(muted) { this.allMuted = muted; }

    async beep(frequency, duration, type) {
        if (frequency === undefined) frequency = 880;
        if (duration === undefined) duration = 0.15;
        if (type === undefined) type = 'sine';
        if (!this.isInitialized || this.allMuted) return;
        await this.ensureAudioContext();
        var oscillator = this.audioContext.createOscillator();
        var gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    async startAgitationTone() {
        if (!this.isInitialized || this.agitationNodes || this.allMuted) return;
        await this.ensureAudioContext();
        var ctx = this.audioContext;
        var nodes = { oscillators: [], gains: [], lfos: [] };
        switch (this.toneType) {
            case 'tick': this._createClockTickTone(ctx, nodes); break;
            case 'pulse': this._createPulseTone(ctx, nodes); break;
            case 'metronome': this._createMetronomeTone(ctx, nodes); break;
            case 'soft': this._createSoftTone(ctx, nodes); break;
            case 'urgent': this._createUrgentTone(ctx, nodes); break;
            case 'chime': this._createChimeTone(ctx, nodes); break;
            case 'tokyo': this._createTokyoCrosswalkTone(ctx, nodes); break;
            default: this._createClockTickTone(ctx, nodes);
        }
        this.agitationNodes = nodes;
    }

    _createPulseTone(ctx, nodes) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        var lfo = ctx.createOscillator();
        var lfoGain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = 660; osc.type = 'sine';
        lfo.frequency.value = 3; lfoGain.gain.value = 0.15;
        lfo.connect(lfoGain); lfoGain.connect(gain.gain);
        gain.gain.value = 0.2;
        lfo.start(); osc.start();
        nodes.oscillators.push(osc); nodes.lfos.push(lfo); nodes.gains.push(gain);
    }

    _createMetronomeTone(ctx, nodes) {
        var self = this;
        this._metronomeActive = true;
        var scheduleClick = function() {
            if (!self._metronomeActive) return;
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.frequency.value = 1000; osc.type = 'square';
            var now = ctx.currentTime;
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            osc.start(now); osc.stop(now + 0.05);
            self._metronomeTimeout = setTimeout(scheduleClick, 1000);
        };
        scheduleClick();
    }

    _createClockTickTone(ctx, nodes) {
        var self = this;
        this._clockTickActive = true;
        var isTick = true;
        var playClick = function() {
            if (!self._clockTickActive) return;
            var now = ctx.currentTime;
            var freq = isTick ? 1600 : 1200;
            isTick = !isTick;
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            var filter = ctx.createBiquadFilter();
            osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
            osc.type = 'square';
            osc.frequency.value = freq;
            filter.type = 'bandpass';
            filter.frequency.value = freq;
            filter.Q.value = 2;
            // Envelope: silent → quick attack → fast decay. Using setValueAtTime
            // before ramping is required for reliable playback on iOS 12 / iPhone 6.
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.35, now + 0.003);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.start(now);
            osc.stop(now + 0.06);
            self._clockTickTimeout = setTimeout(playClick, 1000);
        };
        playClick();
    }

    _createSoftTone(ctx, nodes) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        var filter = ctx.createBiquadFilter();
        osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = 220; osc.type = 'sine';
        filter.type = 'lowpass'; filter.frequency.value = 400;
        gain.gain.value = 0.15; osc.start();
        nodes.oscillators.push(osc); nodes.gains.push(gain);
    }

    _createUrgentTone(ctx, nodes) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        var lfo = ctx.createOscillator();
        var lfoGain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = 880; osc.type = 'sawtooth';
        lfo.frequency.value = 6; lfoGain.gain.value = 0.2;
        lfo.connect(lfoGain); lfoGain.connect(gain.gain);
        gain.gain.value = 0.15; lfo.start(); osc.start();
        nodes.oscillators.push(osc); nodes.lfos.push(lfo); nodes.gains.push(gain);
    }

    _createChimeTone(ctx, nodes) {
        var self = this;
        this._chimeActive = true;
        var scheduleChime = function() {
            if (!self._chimeActive) return;
            var frequencies = [523, 659, 784];
            var now = ctx.currentTime;
            for (var i = 0; i < frequencies.length; i++) {
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.frequency.value = frequencies[i]; osc.type = 'sine';
                var startTime = now + i * 0.08;
                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
                osc.start(startTime); osc.stop(startTime + 0.5);
            }
            self._chimeTimeout = setTimeout(scheduleChime, 1500);
        };
        scheduleChime();
    }

    _createTokyoCrosswalkTone(ctx, nodes) {
        var self = this;
        this._tokyoActive = true;
        var playCuckoo = function() {
            if (!self._tokyoActive) return;
            var now = ctx.currentTime;
            self._playCuckooNote(ctx, 1319, now, 0.25);
            self._playCuckooNote(ctx, 1047, now + 0.35, 0.45);
            self._playCuckooNote(ctx, 1319, now + 0.75, 0.25);
            self._playCuckooNote(ctx, 1319, now + 1, 0.25);
            self._playCuckooNote(ctx, 1047, now + 1.20, 0.45);
            self._tokyoTimeout = setTimeout(playCuckoo, 4000);
        };
        playCuckoo();
    }

    _playCuckooNote(ctx, frequency, startTime, duration) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = frequency; osc.type = 'sine';
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
        gain.gain.setValueAtTime(0.3, startTime + duration * 0.3);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        osc.start(startTime); osc.stop(startTime + duration + 0.05);
    }

    stopAgitationTone() {
        this.agitationMuted = false;
        this._metronomeActive = false;
        if (this._metronomeTimeout) { clearTimeout(this._metronomeTimeout); this._metronomeTimeout = null; }
        this._clockTickActive = false;
        if (this._clockTickTimeout) { clearTimeout(this._clockTickTimeout); this._clockTickTimeout = null; }
        this._chimeActive = false;
        if (this._chimeTimeout) { clearTimeout(this._chimeTimeout); this._chimeTimeout = null; }
        this._tokyoActive = false;
        if (this._tokyoTimeout) { clearTimeout(this._tokyoTimeout); this._tokyoTimeout = null; }
        if (this.agitationNodes) {
            this.agitationNodes.oscillators.forEach(function(osc) { try { osc.stop(); } catch (e) {} });
            this.agitationNodes.lfos.forEach(function(lfo) { try { lfo.stop(); } catch (e) {} });
            this.agitationNodes = null;
        }
    }

    muteAgitationTone() {
        if (!this.agitationNodes || this.agitationMuted) return;
        this.agitationMuted = true;
        var t = this.audioContext.currentTime;
        this.agitationNodes.gains.forEach(function(gain) {
            try { gain.gain.setTargetAtTime(0, t, 0.05); } catch (e) {}
        });
    }

    unmuteAgitationTone() {
        if (!this.agitationNodes || !this.agitationMuted) return;
        this.agitationMuted = false;
        var t = this.audioContext.currentTime;
        this.agitationNodes.gains.forEach(function(gain) {
            try { gain.gain.setTargetAtTime(0.2, t, 0.1); } catch (e) {}
        });
    }

    async testTone(duration) {
        if (duration === undefined) duration = 2000;
        await this.startAgitationTone();
        var self = this;
        setTimeout(function() { self.stopAgitationTone(); }, duration);
    }

    async playAlert() {
        if (!this.isInitialized || this.allMuted) return;
        await this.ensureAudioContext();
        var self = this;
        setTimeout(function() { self.beep(660, 0.1); }, 0);
        setTimeout(function() { self.beep(880, 0.1); }, 150);
        setTimeout(function() { self.beep(1100, 0.2); }, 300);
    }

    async playComplete() {
        if (!this.isInitialized || this.allMuted) return;
        await this.ensureAudioContext();
        var self = this;
        setTimeout(function() { self.beep(523, 0.15); }, 0);
        setTimeout(function() { self.beep(659, 0.15); }, 150);
        setTimeout(function() { self.beep(784, 0.15); }, 300);
        setTimeout(function() { self.beep(1047, 0.3); }, 450);
    }
}

// ============================================================================
// Speech System
// ============================================================================

class SpeechSystem {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.maleVoice = null;
        this.femaleVoice = null;
        this.preferredGender = 'female';
        this.isSupported = 'speechSynthesis' in window;
        this.enabled = true;
        this.quickMuted = false;
        this.isSpeaking = false;
        this.onSpeakStart = null;
        this.onSpeakEnd = null;
    }

    init() {
        if (!this.isSupported) return;
        var self = this;
        var loadVoices = function() {
            self.voices = self.synth.getVoices();
            var englishVoices = self.voices.filter(function(v) { return v.lang.indexOf('en') === 0; });
            var femalePatterns = /female|woman|samantha|victoria|karen|moira|fiona|kate|susan|zira|hazel|linda/i;
            var malePatterns = /male|man|daniel|david|alex|tom|james|fred|ralph|mark|lee/i;
            self.femaleVoice = englishVoices.filter(function(v) { return femalePatterns.test(v.name); })[0] ||
                              englishVoices.filter(function(v) { return !malePatterns.test(v.name); })[0] ||
                              englishVoices[0];
            self.maleVoice = englishVoices.filter(function(v) { return malePatterns.test(v.name); })[0] ||
                            englishVoices[1] || englishVoices[0];
            console.log('Voices loaded:', {
                female: self.femaleVoice ? self.femaleVoice.name : null,
                male: self.maleVoice ? self.maleVoice.name : null
            });
        };
        loadVoices();
        this.synth.onvoiceschanged = loadVoices;
    }

    setGender(gender) { this.preferredGender = gender; }
    setEnabled(enabled) { this.enabled = enabled; }
    setQuickMuted(muted) { this.quickMuted = muted; if (muted) this.synth.cancel(); }
    getVoice() { return this.preferredGender === 'male' ? this.maleVoice : this.femaleVoice; }

    speak(text, priority) {
        if (!this.isSupported || !this.enabled || this.quickMuted) return;
        if (priority) this.synth.cancel();
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.getVoice();
        utterance.rate = 1.0;
        utterance.pitch = this.preferredGender === 'male' ? 0.9 : 1.1;
        utterance.volume = 0.8;
        var self = this;
        utterance.onstart = function() { self.isSpeaking = true; if (self.onSpeakStart) self.onSpeakStart(); };
        utterance.onend = function() { self.isSpeaking = false; if (self.onSpeakEnd) self.onSpeakEnd(); };
        utterance.onerror = function() { self.isSpeaking = false; if (self.onSpeakEnd) self.onSpeakEnd(); };
        this.synth.speak(utterance);
    }
}

// ============================================================================
// Timer Application
// ============================================================================

class FilmDevTimer {
    constructor() {
        this.audio = new AudioSystem();
        this.speech = new SpeechSystem();
        this.config = null;
        this.currentStepIndex = 0;
        this.stepTimeRemaining = 0;
        this.stepTimeElapsed = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.timerInterval = null;
        this.isAgitating = false;
        this.agitationTimeRemaining = 0;
        this.agitationTotalDuration = 0;
        this.agitationHalfTimeAnnounced = false;
        this.countdownInterval = null;
        this.wakeLock = null;
        this.settings = {
            agitationTone: true, toneType: 'tick',
            countdownBeeps: true, stepAlerts: true,
            voiceEnabled: true, voiceGender: 'female',
            includeStopBath: true, includeWettingAgent: true,
            pauseAfterStop: false
        };
        this.isPausedForFixer = false;
        this.tonesMuted = false;
        this.voiceMuted = false;

        this.elements = {
            setupPanel: document.getElementById('setup-panel'),
            timerPanel: document.getElementById('timer-panel'),
            completePanel: document.getElementById('complete-panel'),
            filmSelect: document.getElementById('film-select'),
            developerSelect: document.getElementById('developer-select'),
            configSummary: document.getElementById('config-summary'),
            summaryTime: document.getElementById('summary-time'),
            summaryAgitationInitial: document.getElementById('summary-agitation-initial'),
            summaryAgitationDuration: document.getElementById('summary-agitation-duration'),
            summaryAgitationInterval: document.getElementById('summary-agitation-interval'),
            startBtn: document.getElementById('start-btn'),
            stepName: document.getElementById('step-name'),
            stepChemical: document.getElementById('step-chemical'),
            timerMinutes: document.getElementById('timer-minutes'),
            timerSeconds: document.getElementById('timer-seconds'),
            elapsedTime: document.getElementById('elapsed-time'),
            timerDisplay: document.getElementById('timer-display'),
            agitationIndicator: document.getElementById('agitation-indicator'),
            agitationText: document.getElementById('agitation-text'),
            agitationCountdown: document.getElementById('agitation-countdown'),
            muteToneBtn: document.getElementById('mute-tone-btn'),
            muteVoiceBtn: document.getElementById('mute-voice-btn'),
            skipBtn: document.getElementById('skip-btn'),
            resetBtn: document.getElementById('reset-btn'),
            newSessionBtn: document.getElementById('new-session-btn'),
            countdownPanel: document.getElementById('countdown-panel'),
            countdownNumber: document.getElementById('countdown-number'),
            startCountdownSelect: document.getElementById('start-countdown'),
            skipCountdownBtn: document.getElementById('skip-countdown-btn'),
            soundAgitation: document.getElementById('sound-agitation'),
            toneType: document.getElementById('tone-type'),
            toneTypeRow: document.getElementById('tone-type-row'),
            testToneBtn: document.getElementById('test-tone-btn'),
            soundBeeps: document.getElementById('sound-beeps'),
            soundAlerts: document.getElementById('sound-alerts'),
            voiceEnabled: document.getElementById('voice-enabled'),
            voiceGender: document.getElementById('voice-gender'),
            voiceGenderRow: document.getElementById('voice-gender-row'),
            testVoiceBtn: document.getElementById('test-voice-btn'),
            workflowPanel: document.getElementById('workflow-panel'),
            totalWorkflowTime: document.getElementById('total-workflow-time'),
            workflowDevTime: document.getElementById('workflow-dev-time'),
            workflowDevAgitation: document.getElementById('workflow-dev-agitation'),
            includeStopBath: document.getElementById('include-stop-bath'),
            includeWettingAgent: document.getElementById('include-wetting-agent'),
            stopBathName: document.getElementById('stop-bath-name'),
            stopBathAgitation: document.getElementById('stop-bath-agitation'),
            pauseAfterStop: document.getElementById('pause-after-stop'),
            tempInput: document.getElementById('temp-input'),
            tempUp: document.getElementById('temp-up'),
            tempDown: document.getElementById('temp-down'),
            summaryTemp: document.getElementById('summary-temp'),
            summaryBaseTime: document.getElementById('summary-base-time'),
            summaryAdjustedRow: document.getElementById('summary-adjusted-row')
        };

        this.init();
    }

    async init() {
        this.speech.init();
        var self = this;
        this.speech.onSpeakStart = function() {
            if (self.isAgitating && self.settings.agitationTone) self.audio.muteAgitationTone();
        };
        this.speech.onSpeakEnd = function() {
            if (self.isAgitating && self.settings.agitationTone) self.audio.unmuteAgitationTone();
        };
        loadDeveloperMatrix(function() {
            self.loadFilms();
        });
        this.bindEvents();
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'visible' && self.isRunning) {
                self.audio.ensureAudioContext().then(function() {
                    if (self.isAgitating && self.settings.agitationTone && !self.tonesMuted) {
                        self.audio.startAgitationTone();
                    }
                });
            }
        });
    }

    bindEvents() {
        var self = this;
        this.elements.filmSelect.addEventListener('change', function(e) { self.onFilmChange(e.target.value); });
        this.elements.developerSelect.addEventListener('change', function(e) { self.onDeveloperChange(e.target.value); });
        this.elements.tempInput.addEventListener('change', function() { self.onTempChange(); });
        this.elements.tempUp.addEventListener('click', function() { self.adjustTemp(0.5); });
        this.elements.tempDown.addEventListener('click', function() { self.adjustTemp(-0.5); });
        this.elements.startBtn.addEventListener('click', function() {
            self.audio.init().then(function() {
                var countdownSeconds = parseInt(self.elements.startCountdownSelect.value, 10);
                if (countdownSeconds > 0) { self.startCountdown(countdownSeconds); }
                else { self.startDevelopment(); }
            });
        });
        this.elements.skipCountdownBtn.addEventListener('click', function() { self.skipCountdown(); });
        this.elements.skipBtn.addEventListener('click', function() { self.skipStep(); });
        this.elements.resetBtn.addEventListener('click', function() { self.confirmRestart(); });
        this.elements.newSessionBtn.addEventListener('click', function() { self.reset(); });
        this.elements.muteToneBtn.addEventListener('click', function() {
            self.tonesMuted = !self.tonesMuted;
            self.elements.muteToneBtn.classList.toggle('active', self.tonesMuted);
            self.audio.setAllMuted(self.tonesMuted);
            if (self.tonesMuted && self.isAgitating) self.audio.stopAgitationTone();
            if (!self.tonesMuted && self.isAgitating && self.settings.agitationTone) self.audio.startAgitationTone();
        });
        this.elements.muteVoiceBtn.addEventListener('click', function() {
            self.voiceMuted = !self.voiceMuted;
            self.elements.muteVoiceBtn.classList.toggle('active', self.voiceMuted);
            self.speech.setQuickMuted(self.voiceMuted);
        });
        this.elements.soundAgitation.addEventListener('change', function(e) {
            self.settings.agitationTone = e.target.checked; self.updateToneTypeVisibility(); self.saveSettings();
        });
        this.elements.toneType.addEventListener('change', function(e) {
            self.settings.toneType = e.target.value; self.audio.setToneType(e.target.value); self.saveSettings();
        });
        this.elements.testToneBtn.addEventListener('click', function() {
            self.audio.init().then(function() {
                self.elements.testToneBtn.classList.add('playing');
                self.audio.testTone(2000);
                setTimeout(function() { self.elements.testToneBtn.classList.remove('playing'); }, 2000);
            });
        });
        this.elements.soundBeeps.addEventListener('change', function(e) { self.settings.countdownBeeps = e.target.checked; self.saveSettings(); });
        this.elements.soundAlerts.addEventListener('change', function(e) { self.settings.stepAlerts = e.target.checked; self.saveSettings(); });
        this.elements.voiceEnabled.addEventListener('change', function(e) {
            self.settings.voiceEnabled = e.target.checked; self.speech.setEnabled(e.target.checked);
            self.updateVoiceGenderVisibility(); self.saveSettings();
        });
        this.elements.voiceGender.addEventListener('change', function(e) {
            self.settings.voiceGender = e.target.value; self.speech.setGender(e.target.value); self.saveSettings();
        });
        this.elements.testVoiceBtn.addEventListener('click', function() {
            self.audio.init().then(function() {
                self.elements.testVoiceBtn.classList.add('playing');
                self.speech.speak('Agitate now. Stop.', true);
                setTimeout(function() { self.elements.testVoiceBtn.classList.remove('playing'); }, 2000);
            });
        });
        this.elements.includeStopBath.addEventListener('change', function(e) {
            self.settings.includeStopBath = e.target.checked;
            self.updateStopBathUI(e.target.checked);
            self.refreshSelectedRecipeConfig();
            self.saveSettings();
        });
        this.elements.includeWettingAgent.addEventListener('change', function(e) {
            self.settings.includeWettingAgent = e.target.checked;
            self.updateOptionalStepUI('wetting-agent', e.target.checked);
            self.refreshSelectedRecipeConfig();
            self.saveSettings();
        });
        this.elements.pauseAfterStop.addEventListener('change', function(e) {
            self.settings.pauseAfterStop = e.target.checked; self.saveSettings();
        });
        this.loadSettings();
    }

    updateOptionalStepUI(stepType, isIncluded) {
        var checkbox = stepType === 'stop-bath' ? this.elements.includeStopBath : this.elements.includeWettingAgent;
        var stepItem = checkbox.closest('.workflow-step-item');
        if (isIncluded) stepItem.classList.remove('disabled');
        else stepItem.classList.add('disabled');
    }

    updateStopBathUI(useStopBath) {
        if (useStopBath) {
            this.elements.stopBathName.textContent = 'Stop Bath';
            this.elements.stopBathAgitation.textContent = '3 rapid inversions';
        } else {
            this.elements.stopBathName.textContent = 'Water Bath';
            this.elements.stopBathAgitation.textContent = '3 rapid inversions (water rinse)';
        }
    }

    updateTotalWorkflowTime() {
        if (!this.config) return;
        var devTime = this.config.steps[0].time_seconds;
        var totalSeconds = devTime + 30 + 30 + 30 + 300 + 30 + 300;
        if (this.settings.includeWettingAgent) totalSeconds += 30 + 30;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        var timeDisplay = seconds > 0 ? minutes + ':' + (seconds < 10 ? '0' : '') + seconds : minutes + ' min';
        this.elements.totalWorkflowTime.textContent = timeDisplay;
    }

    loadSettings() {
        var saved = localStorage.getItem('filmDevTimerSettings');
        if (saved) {
            try {
                var parsed = JSON.parse(saved);
                for (var key in parsed) { if (parsed.hasOwnProperty(key)) this.settings[key] = parsed[key]; }
            } catch (e) {}
        }
        this.elements.soundAgitation.checked = this.settings.agitationTone;
        this.elements.toneType.value = this.settings.toneType;
        this.elements.soundBeeps.checked = this.settings.countdownBeeps;
        this.elements.soundAlerts.checked = this.settings.stepAlerts;
        this.elements.voiceEnabled.checked = this.settings.voiceEnabled;
        this.elements.voiceGender.value = this.settings.voiceGender;
        this.elements.includeStopBath.checked = this.settings.includeStopBath;
        this.elements.includeWettingAgent.checked = this.settings.includeWettingAgent;
        this.elements.pauseAfterStop.checked = this.settings.pauseAfterStop;
        this.updateStopBathUI(this.settings.includeStopBath);
        this.updateOptionalStepUI('wetting-agent', this.settings.includeWettingAgent);
        this.audio.setToneType(this.settings.toneType);
        this.speech.setEnabled(this.settings.voiceEnabled);
        this.speech.setGender(this.settings.voiceGender);
        this.updateToneTypeVisibility();
        this.updateVoiceGenderVisibility();
    }

    saveSettings() { localStorage.setItem('filmDevTimerSettings', JSON.stringify(this.settings)); }
    updateToneTypeVisibility() {
        if (this.settings.agitationTone) this.elements.toneTypeRow.classList.remove('disabled');
        else this.elements.toneTypeRow.classList.add('disabled');
    }
    updateVoiceGenderVisibility() {
        if (this.settings.voiceEnabled) this.elements.voiceGenderRow.classList.remove('disabled');
        else this.elements.voiceGenderRow.classList.add('disabled');
    }

    refreshSelectedRecipeConfig() {
        var recipeId = this.elements.developerSelect.value;
        if (!recipeId) return;
        this.onDeveloperChange(recipeId);
    }

    loadFilms() {
        var films = DataService.getFilms();
        for (var i = 0; i < films.length; i++) {
            var option = document.createElement('option');
            option.value = films[i].id;
            option.textContent = films[i].display;
            this.elements.filmSelect.appendChild(option);
        }
    }

    onFilmChange(filmId) {
        if (!filmId) {
            this.elements.developerSelect.disabled = true;
            this.elements.developerSelect.textContent = '';
            var defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.textContent = 'Select a developer...';
            this.elements.developerSelect.appendChild(defaultOpt);
            this.elements.configSummary.classList.add('hidden');
            this.elements.workflowPanel.classList.add('hidden');
            this.elements.startBtn.disabled = true;
            return;
        }
        var developers = DataService.getDevelopers(filmId);
        this.elements.developerSelect.textContent = '';
        var placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Select a developer...';
        this.elements.developerSelect.appendChild(placeholder);
        for (var i = 0; i < developers.length; i++) {
            var dev = developers[i];
            var option = document.createElement('option');
            option.value = dev.id;
            option.textContent = dev.display;
            option.setAttribute('data-time', dev.time_display);
            option.setAttribute('data-agitation-start', dev.agitation_start_s);
            option.setAttribute('data-agitation-time', dev.agitation_time_s);
            option.setAttribute('data-agitation-cycle', dev.agitation_cycle_s);
            this.elements.developerSelect.appendChild(option);
        }
        this.elements.developerSelect.disabled = false;
        this.elements.configSummary.classList.add('hidden');
        this.elements.workflowPanel.classList.add('hidden');
        this.elements.startBtn.disabled = true;
    }

    getTemp() {
        var val = parseFloat(this.elements.tempInput.value);
        if (isNaN(val) || val < 18) return 18;
        if (val > 24) return 24;
        return val;
    }

    adjustTemp(delta) {
        var current = this.getTemp();
        var next = Math.round((current + delta) * 10) / 10;
        if (next < 18) next = 18;
        if (next > 24) next = 24;
        this.elements.tempInput.value = next;
        this.onTempChange();
    }

    onTempChange() {
        this.refreshSelectedRecipeConfig();
    }

    onDeveloperChange(recipeId) {
        if (!recipeId) {
            this.elements.configSummary.classList.add('hidden');
            this.elements.workflowPanel.classList.add('hidden');
            this.elements.startBtn.disabled = true;
            return;
        }
        var filmId = this.elements.filmSelect.value;
        var tempC = this.getTemp();
        this.config = DataService.getTimerConfig(recipeId, filmId, tempC, this.settings.includeStopBath, this.settings.includeWettingAgent);
        if (!this.config) return;
        var devStep = this.config.steps[0];
        var isAdjusted = tempC !== 20;
        this.elements.summaryTime.textContent = devStep.time_display;
        this.elements.summaryTemp.textContent = tempC + '°C';
        if (isAdjusted) {
            this.elements.summaryBaseTime.textContent = formatSeconds(this.config.baseTimeSeconds);
            this.elements.summaryAdjustedRow.classList.remove('hidden');
        } else {
            this.elements.summaryAdjustedRow.classList.add('hidden');
        }
        this.elements.summaryAgitationInitial.textContent = devStep.agitation.start_seconds + 's';
        this.elements.summaryAgitationDuration.textContent = devStep.agitation.duration_seconds + 's';
        this.elements.summaryAgitationInterval.textContent = 'every ' + devStep.agitation.cycle_seconds + 's';
        this.elements.workflowDevTime.textContent = devStep.time_display;
        this.elements.workflowDevAgitation.textContent =
            devStep.agitation.start_seconds + 's initial, then ' + devStep.agitation.duration_seconds + 's every ' + devStep.agitation.cycle_seconds + 's';
        this.updateTotalWorkflowTime();
        this.elements.configSummary.classList.remove('hidden');
        this.elements.workflowPanel.classList.remove('hidden');
        this.elements.startBtn.disabled = false;
    }

    startCountdown(seconds) {
        if (!this.config) return;
        this.elements.setupPanel.classList.add('hidden');
        this.elements.countdownPanel.classList.remove('hidden');
        var remaining = seconds;
        this.elements.countdownNumber.textContent = remaining;
        this.speech.speak('Starting in ' + seconds + ' seconds. Prepare your chemicals.', true);
        var self = this;
        this.countdownInterval = setInterval(function() {
            remaining--;
            self.elements.countdownNumber.textContent = remaining;
            if (remaining <= 3 && remaining > 0) {
                if (self.settings.countdownBeeps) self.audio.beep(880, 0.1);
                self.speech.speak(remaining.toString(), true);
            }
            if (remaining <= 0) {
                clearInterval(self.countdownInterval);
                self.countdownInterval = null;
                self.elements.countdownPanel.classList.add('hidden');
                self.startDevelopment();
            }
        }, 1000);
    }

    skipCountdown() {
        if (this.countdownInterval) { clearInterval(this.countdownInterval); this.countdownInterval = null; }
        this.elements.countdownPanel.classList.add('hidden');
        this.startDevelopment();
    }

    startDevelopment() {
        if (!this.config) return;
        var recipeId = this.elements.developerSelect.value;
        var filmId = this.elements.filmSelect.value;
        var tempC = this.getTemp();
        this.config = DataService.getTimerConfig(recipeId, filmId, tempC, this.settings.includeStopBath, this.settings.includeWettingAgent);
        if (!this.config) return;
        this.updateWorkflowProgressIndicators();
        this.elements.setupPanel.classList.add('hidden');
        this.elements.countdownPanel.classList.add('hidden');
        this.elements.timerPanel.classList.remove('hidden');
        this.currentStepIndex = 0;
        this.isRunning = true;
        this.isPaused = false;
        this.acquireWakeLock();
        this.startStep(0);
        this.speech.speak('Starting development. Begin agitation.', true);
    }

    updateWorkflowProgressIndicators() {
        var progressContainer = document.querySelector('.workflow-progress');
        if (!progressContainer) return;
        while (progressContainer.firstChild) progressContainer.removeChild(progressContainer.firstChild);
        var stopStepName = this.settings.includeStopBath ? 'Stop' : 'Water';
        var mainSteps = [
            { name: 'Developer', enabled: true },
            { name: stopStepName, enabled: true },
            { name: 'Fixer', enabled: true },
            { name: 'Wash', enabled: true },
            { name: 'Rinse', enabled: this.settings.includeWettingAgent }
        ];
        var enabledSteps = mainSteps.filter(function(s) { return s.enabled; });
        for (var i = 0; i < enabledSteps.length; i++) {
            var indicator = document.createElement('div');
            indicator.className = 'step-indicator';
            indicator.setAttribute('data-step', i + 1);
            var dot = document.createElement('div');
            dot.className = 'step-dot';
            var label = document.createElement('span');
            label.className = 'step-label';
            label.textContent = enabledSteps[i].name;
            indicator.appendChild(dot);
            indicator.appendChild(label);
            progressContainer.appendChild(indicator);
            if (i < enabledSteps.length - 1) {
                var connector = document.createElement('div');
                connector.className = 'step-connector';
                progressContainer.appendChild(connector);
            }
        }
    }

    startStep(index) {
        if (index >= this.config.steps.length) { this.complete(); return; }
        var step = this.config.steps[index];
        this.currentStepIndex = index;
        this.stepTimeRemaining = step.time_seconds;
        this.stepTimeElapsed = 0;
        this.elements.stepName.textContent = step.name;
        this.elements.stepChemical.textContent = step.chemical;
        this.updateTimerDisplay();
        this.updateStepIndicators();
        if (step.is_transition) {
            this.elements.timerPanel.classList.add('transition-step');
            this.elements.agitationIndicator.classList.add('hidden');
            this.elements.skipBtn.textContent = 'Ready → Continue';
            this.elements.skipBtn.classList.add('btn-ready');
        } else {
            this.elements.timerPanel.classList.remove('transition-step');
            this.elements.agitationIndicator.classList.remove('hidden');
            this.elements.skipBtn.textContent = 'Skip Step →';
            this.elements.skipBtn.classList.remove('btn-ready');
        }
        this.isAgitating = false;
        this.agitationTimeRemaining = 0;
        this.updateAgitationUI();
        this.startTimer();
        if (!step.is_transition && step.agitation.start_seconds > 0) {
            this.startAgitation(step.agitation.start_seconds);
        }
    }

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        var self = this;
        this.timerInterval = setInterval(function() { if (!self.isPaused) self.tick(); }, 1000);
    }

    tick() {
        var step = this.config.steps[this.currentStepIndex];
        this.stepTimeRemaining--;
        this.stepTimeElapsed++;
        this.updateTimerDisplay();
        if (this.isAgitating) {
            this.agitationTimeRemaining--;
            this.updateAgitationUI();
            var halfTime = Math.floor(this.agitationTotalDuration / 2);
            if (this.agitationTotalDuration >= 10 && this.agitationTimeRemaining === halfTime && !this.agitationHalfTimeAnnounced) {
                this.agitationHalfTimeAnnounced = true;
                this.speech.speak(halfTime + ' seconds');
            }
            if (this.agitationTimeRemaining === 10 && this.agitationTotalDuration > 15) this.speech.speak('10 seconds');
            if (this.agitationTimeRemaining === 3 && this.settings.agitationTone) this.audio.muteAgitationTone();
            if (this.agitationTimeRemaining <= 3 && this.agitationTimeRemaining > 0) this.speech.speak(this.agitationTimeRemaining.toString());
            if (this.agitationTimeRemaining <= 0) this.stopAgitation();
        }
        if (!this.isAgitating && step.agitation.cycle_seconds > 0 && step.agitation.duration_seconds > 0) {
            var timeAfterStart = this.stepTimeElapsed;
            if (timeAfterStart > step.agitation.start_seconds) {
                var timeSinceStart = timeAfterStart - step.agitation.start_seconds;
                var timeUntilNextAgitation = step.agitation.cycle_seconds - (timeSinceStart % step.agitation.cycle_seconds);
                if (timeUntilNextAgitation === 10) this.speech.speak('Prepare for agitation');
                if (timeUntilNextAgitation <= 3 && timeUntilNextAgitation > 0) {
                    if (this.settings.countdownBeeps) this.audio.beep(880, 0.1);
                }
                if (timeSinceStart % step.agitation.cycle_seconds === 0) this.startAgitation(step.agitation.duration_seconds);
            }
        }
        if (this.stepTimeRemaining <= 0) { this.completeStep(); return; }
        if (this.stepTimeRemaining === 10 && !step.is_transition) {
            if (this.settings.countdownBeeps) this.audio.beep(440, 0.2);
        }
        if (this.stepTimeRemaining <= 3 && this.stepTimeRemaining > 0 && !step.is_transition) {
            if (this.settings.countdownBeeps) this.audio.beep(880, 0.1);
        }
    }

    startAgitation(duration) {
        this.isAgitating = true;
        this.agitationTimeRemaining = duration;
        this.agitationTotalDuration = duration;
        this.agitationHalfTimeAnnounced = false;
        this.elements.agitationIndicator.classList.remove('preparing');
        this.updateAgitationUI();
        if (this.settings.agitationTone) this.audio.startAgitationTone();
        this.speech.speak('Agitate', true);
    }

    stopAgitation() {
        this.isAgitating = false;
        this.agitationTimeRemaining = 0;
        this.updateAgitationUI();
        this.audio.stopAgitationTone();
        if (this.settings.countdownBeeps) this.audio.beep(440, 0.15);
        this.speech.speak('Stop');
    }

    completeStep() {
        clearInterval(this.timerInterval);
        this.audio.stopAgitationTone();
        var currentStep = this.config.steps[this.currentStepIndex];
        var stepIndicators = document.querySelectorAll('.step-indicator');
        var connectors = document.querySelectorAll('.step-connector');
        if (!currentStep.is_transition) {
            var mainStepIndex = this.getMainStepIndex(this.currentStepIndex);
            if (stepIndicators[mainStepIndex]) {
                stepIndicators[mainStepIndex].classList.remove('active');
                stepIndicators[mainStepIndex].classList.add('completed');
            }
            if (connectors[mainStepIndex]) connectors[mainStepIndex].classList.add('completed');
        }
        var isStopBathStep = currentStep.name === 'Stop Bath' || currentStep.name === 'Water Bath';
        if (isStopBathStep && this.settings.pauseAfterStop) { this.pauseForFixer(); return; }
        this.advanceToNextStep();
    }

    pauseForFixer() {
        this.isPausedForFixer = true;
        this.elements.timerPanel.classList.add('paused-for-fixer');
        this.elements.stepName.textContent = 'Prepare Fixer';
        this.elements.stepChemical.textContent = 'Check fixer temperature, then continue';
        this.elements.timerMinutes.textContent = '--';
        this.elements.timerSeconds.textContent = '--';
        this.elements.elapsedTime.textContent = 'Paused';
        this.elements.agitationIndicator.classList.add('hidden');
        this.elements.skipBtn.textContent = 'Fixer Ready → Continue';
        this.elements.skipBtn.classList.add('btn-ready');
        if (this.settings.stepAlerts) this.audio.playAlert();
        this.speech.speak('Stop bath complete. Prepare your fixer. Press continue when ready.', true);
    }

    resumeFromFixerPause() {
        this.isPausedForFixer = false;
        this.elements.timerPanel.classList.remove('paused-for-fixer');
        this.elements.skipBtn.textContent = 'Skip Step →';
        this.elements.skipBtn.classList.remove('btn-ready');
        this.advanceToNextStep();
    }

    advanceToNextStep() {
        var currentStep = this.config.steps[this.currentStepIndex];
        var nextIndex = this.currentStepIndex + 1;
        if (nextIndex >= this.config.steps.length) { this.complete(); return; }
        var nextStep = this.config.steps[nextIndex];
        if (this.settings.stepAlerts && !nextStep.is_transition) this.audio.playAlert();
        if (nextStep.is_transition) this.speech.speak(nextStep.chemical, true);
        else this.speech.speak(nextStep.name + '. ' + nextStep.chemical + '.', true);
        var delay = currentStep.is_transition ? 500 : 1500;
        var self = this;
        setTimeout(function() { self.startStep(nextIndex); }, delay);
    }

    complete() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        this.audio.stopAgitationTone();
        this.releaseWakeLock();
        this.elements.timerPanel.classList.add('hidden');
        this.elements.completePanel.classList.remove('hidden');
        if (this.settings.stepAlerts) this.audio.playComplete();
        this.speech.speak('Development complete! Your film is ready.', true);
    }

    confirmRestart() { if (confirm('Restart development? This will abandon the current process.')) this.reset(); }

    skipStep() {
        if (this.isPausedForFixer) { this.resumeFromFixerPause(); return; }
        var step = this.config.steps[this.currentStepIndex];
        if (step.is_transition || confirm('Skip to the next step?')) this.completeStep();
    }

    reset() {
        this.isRunning = false;
        this.isPaused = false;
        this.isPausedForFixer = false;
        clearInterval(this.timerInterval);
        if (this.countdownInterval) { clearInterval(this.countdownInterval); this.countdownInterval = null; }
        this.audio.stopAgitationTone();
        document.querySelectorAll('.step-indicator').forEach(function(el) { el.classList.remove('active', 'completed'); });
        document.querySelectorAll('.step-connector').forEach(function(el) { el.classList.remove('completed'); });
        this.restoreOriginalWorkflowProgress();
        this.elements.timerPanel.classList.remove('transition-step');
        this.elements.timerPanel.classList.remove('paused-for-fixer');
        this.elements.agitationIndicator.classList.remove('hidden');
        this.elements.skipBtn.textContent = 'Skip Step →';
        this.elements.skipBtn.classList.remove('btn-ready');
        this.tonesMuted = false;
        this.voiceMuted = false;
        this.audio.setAllMuted(false);
        this.speech.setQuickMuted(false);
        this.elements.muteToneBtn.classList.remove('active');
        this.elements.muteVoiceBtn.classList.remove('active');
        this.elements.timerPanel.classList.add('hidden');
        this.elements.completePanel.classList.add('hidden');
        this.elements.countdownPanel.classList.add('hidden');
        this.elements.setupPanel.classList.remove('hidden');
        this.releaseWakeLock();
    }

    restoreOriginalWorkflowProgress() {
        var progressContainer = document.querySelector('.workflow-progress');
        if (!progressContainer) return;
        var defaultSteps = ['Developer', 'Stop', 'Fixer', 'Wash', 'Rinse'];
        while (progressContainer.firstChild) progressContainer.removeChild(progressContainer.firstChild);
        for (var i = 0; i < defaultSteps.length; i++) {
            var indicator = document.createElement('div');
            indicator.className = 'step-indicator';
            indicator.setAttribute('data-step', i + 1);
            var dot = document.createElement('div');
            dot.className = 'step-dot';
            var label = document.createElement('span');
            label.className = 'step-label';
            label.textContent = defaultSteps[i];
            indicator.appendChild(dot);
            indicator.appendChild(label);
            progressContainer.appendChild(indicator);
            if (i < defaultSteps.length - 1) {
                var connector = document.createElement('div');
                connector.className = 'step-connector';
                progressContainer.appendChild(connector);
            }
        }
    }

    async acquireWakeLock() {
        if ('wakeLock' in navigator) {
            try {
                this.wakeLock = await navigator.wakeLock.request('screen');
                var self = this;
                this.wakeLock.addEventListener('release', function() {});
                document.addEventListener('visibilitychange', function() {
                    if (document.visibilityState === 'visible' && self.isRunning) self.acquireWakeLock();
                });
            } catch (err) {}
        }
    }

    releaseWakeLock() {
        if (this.wakeLock) { this.wakeLock.release(); this.wakeLock = null; }
    }

    updateTimerDisplay() {
        var minutes = Math.floor(this.stepTimeRemaining / 60);
        var seconds = this.stepTimeRemaining % 60;
        this.elements.timerMinutes.textContent = (minutes < 10 ? '0' : '') + minutes;
        this.elements.timerSeconds.textContent = (seconds < 10 ? '0' : '') + seconds;
        var elapsedMin = Math.floor(this.stepTimeElapsed / 60);
        var elapsedSec = this.stepTimeElapsed % 60;
        this.elements.elapsedTime.textContent = elapsedMin + ':' + (elapsedSec < 10 ? '0' : '') + elapsedSec;
    }

    updateStepIndicators() {
        var stepIndicators = document.querySelectorAll('.step-indicator');
        var mainStepIndex = 0;
        for (var i = 0; i < this.currentStepIndex; i++) {
            if (!this.config.steps[i].is_transition) mainStepIndex++;
        }
        var currentStep = this.config.steps[this.currentStepIndex];
        if (currentStep && currentStep.is_transition) mainStepIndex--;
        stepIndicators.forEach(function(indicator, index) {
            indicator.classList.remove('active');
            if (index === mainStepIndex) indicator.classList.add('active');
        });
    }

    getMainStepIndex(stepIndex) {
        var mainIndex = 0;
        for (var i = 0; i <= stepIndex; i++) {
            if (!this.config.steps[i].is_transition) mainIndex++;
        }
        return mainIndex - 1;
    }

    updateAgitationUI() {
        if (this.isAgitating) {
            this.elements.agitationIndicator.classList.add('active');
            this.elements.agitationText.textContent = 'AGITATE';
            this.elements.agitationCountdown.textContent = this.agitationTimeRemaining + 's';
        } else {
            this.elements.agitationIndicator.classList.remove('active');
            this.elements.agitationText.textContent = 'Agitate';
            var step = this.config && this.config.steps[this.currentStepIndex];
            if (step && step.agitation.cycle_seconds > 0) {
                var timeAfterStart = this.stepTimeElapsed;
                if (timeAfterStart >= step.agitation.start_seconds) {
                    var timeSinceStart = timeAfterStart - step.agitation.start_seconds;
                    var timeUntilNext = step.agitation.cycle_seconds - (timeSinceStart % step.agitation.cycle_seconds);
                    var nextAtRemaining = this.stepTimeRemaining - timeUntilNext;
                    if (timeUntilNext < step.agitation.cycle_seconds && nextAtRemaining > 0) {
                        var nm = Math.floor(nextAtRemaining / 60);
                        var ns = nextAtRemaining % 60;
                        this.elements.agitationCountdown.textContent = 'at ' + nm + ':' + (ns < 10 ? '0' : '') + ns;
                        if (timeUntilNext <= 5) {
                            this.elements.agitationIndicator.classList.add('preparing');
                            this.elements.agitationText.textContent = 'Get Ready';
                        } else {
                            this.elements.agitationIndicator.classList.remove('preparing');
                        }
                    } else {
                        this.elements.agitationCountdown.textContent = '--';
                        this.elements.agitationIndicator.classList.remove('preparing');
                    }
                } else {
                    this.elements.agitationCountdown.textContent = '--';
                    this.elements.agitationIndicator.classList.remove('preparing');
                }
            } else {
                this.elements.agitationCountdown.textContent = '--';
                this.elements.agitationIndicator.classList.remove('preparing');
            }
        }
    }
}

// ============================================================================
// Initialize
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    window.filmDevTimer = new FilmDevTimer();
});
