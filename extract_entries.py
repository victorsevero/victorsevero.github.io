import requests, json
HIDE = '[POKÉMON NAME]'

dict_poke_entries = {}

for i in range(1, 808):
    req_text = requests.get('https://pokeapi.co/api/v2/pokemon-species/{}/'.format(i)).text
    dict_poke = json.loads(req_text)

    list_entries = []

    for dict_entry in dict_poke['flavor_text_entries']:
        if dict_entry['language']['name'] == 'en':
            entry_text = dict_entry['flavor_text']
            entry_text = entry_text.replace('\n', ' ').replace('\f', ' ')
            entry_text = entry_text.replace(dict_poke['name'].capitalize(), HIDE)
            entry_text = entry_text.replace(dict_poke['name'].upper(), HIDE)
            if entry_text not in list_entries:
                list_entries.append(entry_text)

    dict_poke_entries[dict_poke['name']] = list_entries

with open('poke_entries.json', 'w') as f:
    json.dump(dict_poke_entries, f, indent=4)