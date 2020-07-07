import requests, json
HIDE = '[POKÉMON NAME]'

dict_poke_entries = {}

for i in range(1, 808):
    req_text = requests.get('https://pokeapi.co/api/v2/pokemon-species/{}/'.format(i)).text
    dict_poke = json.loads(req_text)

    list_entries = []

    for name in dict_poke['names']:
        if name['language']['name'] == 'en':
            poke_name = name['name']
            break

    for dict_entry in dict_poke['flavor_text_entries']:
        if dict_entry['language']['name'] == 'en':
            entry_text = dict_entry['flavor_text']
            entry_text = entry_text.replace('\n', ' ').replace('\f', ' ').replace('\u00ad ', '')
            entry_text = entry_text.replace(poke_name, HIDE)
            entry_text = entry_text.replace(poke_name.upper(), HIDE)
            if entry_text not in list_entries:
                list_entries.append(entry_text)

    dict_poke_entries[poke_name] = list_entries

    print('Extracting pokémon #{}'.format(i), end='\r')

for nido in ['Nidoran♀', 'Nidoran♂']:
    for i, entry_text in enumerate(dict_poke_entries[nido]):
        dict_poke_entries[nido][i] = entry_text.replace('NIDORAN', HIDE)

with open('poke_entries.json', 'w') as f:
    json.dump(dict_poke_entries, f, indent=4)