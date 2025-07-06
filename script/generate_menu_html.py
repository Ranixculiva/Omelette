import json
import os
import sys

def list_template_options(folder):
    if not os.path.isdir(folder):
        return []
    return [f for f in os.listdir(folder) if f.endswith('.html') and os.path.isfile(os.path.join(folder, f))]

DATA_PATH = os.path.join('data', 'omelette_menu_brunch.json')
TEMPLATE_DIR = 'template_for_figma'
OUTPUT_DIR = 'html_for_figma'

# Helper functions to generate HTML for each section
def render_categories(categories):
    html = []
    for cat in categories:
        html.append(f'<div style="flex: 1 1 320px; min-width: 320px;">')
        h2_color = '#d94f2a' if cat.get('is_new') else '#3a7c6c'
        h2_extra = ''
        if cat.get('is_new'):
            h2_extra = ' <span style="font-size: 0.9rem; color: #d94f2a;">NEW</span>'
        html.append(f'<h2 style="color: {h2_color}; font-size: 1.2rem; margin-bottom: 8px;">{cat["title"]}{h2_extra}</h2>')
        html.append('<ul style="margin: 0; padding-left: 18px;">')
        for item in cat['items']:
            name = item['name']
            price = item['price']
            is_recommended = item.get('is_recommended', False)
            is_new = item.get('is_new', False)
            label = f'<b>{name} {price}</b>' if is_recommended else f'{name} {price}'
            if is_new:
                label = f'<span style="color: #d94f2a;">{name} {price} NEW</span>'
            html.append(f'<li>{label}</li>')
        html.append('</ul>')
        if 'side_dish_options' in cat:
            html.append(f'<div style="font-size: 0.95rem; color: #888;">附餐({"、".join(cat["side_dish_options"])}，2選1)</div>')
        if 'note' in cat:
            html.append(f'<div style="font-size: 0.95rem; color: #888;">{cat["note"]}</div>')
        if 'add_ons' in cat:
            add_ons = '、'.join([f'{a["name"]} {a["price"]}' for a in cat['add_ons']])
            html.append(f'<div style="font-size: 0.95rem; color: #3a7c6c;">加購：{add_ons}</div>')
        html.append('</div>')
    return '\n'.join(html)

def render_set_options(set_options):
    html = []
    html.append('<div style="margin-top: 32px;">')
    html.append('<h2 style="color: #3a7c6c; font-size: 1.2rem;">套餐優惠</h2>')
    html.append('<div style="display: flex; gap: 16px;">')
    for opt in set_options['items']:
        html.append('<div style="background: #e6f7e6; border-radius: 12px; padding: 12px 18px; min-width: 120px;">')
        html.append(f'<div style="font-weight: bold; color: #3a7c6c;">{opt["name"]}套餐 +{opt["extra_price"]}元</div>')
        html.append('<div>' + '<br>'.join(opt['content']) + '</div>')
        html.append(f'<div style="color: #d94f2a; font-size: 0.95rem;">SAVE {opt["save"]}</div>')
        html.append('</div>')
    html.append('</div>')
    if 'notes' in set_options:
        for note in set_options['notes']:
            html.append(f'<div style="font-size: 0.95rem; color: #888; margin-top: 8px;">{note}</div>')
    html.append('</div>')
    return '\n'.join(html)

def render_drinks(drinks):
    html = []
    html.append('<h2 style="color: #3a7c6c; font-size: 1.2rem;">飲料系列</h2>')
    html.append('<ul style="margin: 0; padding-left: 18px;">')
    for d in drinks:
        temps = f'({"/".join(d["temperature"])})' if "temperature" in d else ''
        sizes = '、'.join([f'{s["label"]} {s["price"]}' for s in d['size']])
        notes = f' <span style="font-size: 0.9rem; color: #d94f2a;">{d["notes"]}</span>' if "notes" in d else ''
        html.append(f'<li>{d["name"]} {temps} {sizes}{notes}</li>')
    html.append('</ul>')
    return '\n'.join(html)

def render_contact(contact, social):
    html = []
    html.append('<div style="margin-top: 24px; font-size: 1rem; color: #3a7c6c;">')
    html.append(f'<div>地址：{contact["address"]}</div>')
    html.append(f'<div>電話：{contact["phone"]}</div>')
    if social:
        for s in social:
            html.append(f'<div>{s["platform"]}：{s["name"]}</div>')
    html.append('</div>')
    return '\n'.join(html)

def render_notes(notes):
    html = []
    html.append('<div style="margin-top: 12px; font-size: 0.95rem; color: #888;">')
    for n in notes:
        html.append(n + '<br>')
    html.append('</div>')
    return '\n'.join(html)

def main():
    options = list_template_options(TEMPLATE_DIR)
    if options:
        print('Available template files in template_for_figma:')
        for idx, fname in enumerate(options, 1):
            print(f'  {idx}. {fname}')
        while True:
            choice = input(f'Select a template by number (1-{len(options)}): ').strip()
            if choice.isdigit() and 1 <= int(choice) <= len(options):
                template_path = os.path.join(TEMPLATE_DIR, options[int(choice)-1])
                break
            else:
                print('Invalid selection. Please enter a valid number.')
    else:
        template_path = input('No .html templates found in template_for_figma. Enter the path to your template HTML file (relative or absolute): ').strip()
        if not os.path.isfile(template_path):
            print(f'File not found: {template_path}')
            sys.exit(1)
    base = os.path.splitext(os.path.basename(template_path))[0]
    output_path = os.path.join(OUTPUT_DIR, f'{base}_generated.html')

    with open(DATA_PATH, encoding='utf-8') as f:
        data = json.load(f)
    with open(template_path, encoding='utf-8') as f:
        template = f.read()

    # Replace blocks in template
    # You can add {{categories}}, {{set_options}}, {{drinks}}, {{contact}}, {{notes}} in the template for replacement
    html = template
    html = html.replace(
        '<!--CATEGORIES-->',
        render_categories(data['categories'])
    )
    html = html.replace(
        '<!--SET_OPTIONS-->',
        render_set_options(data['set_options'])
    )
    html = html.replace(
        '<!--DRINKS-->',
        render_drinks(data['drinks'])
    )
    html = html.replace(
        '<!--CONTACT-->',
        render_contact(data['contact'], data.get('social', []))
    )
    html = html.replace(
        '<!--NOTES-->',
        render_notes(data['notes'])
    )

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Generated HTML written to {output_path}')

if __name__ == '__main__':
    main() 