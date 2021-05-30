# icomoon-helper
icomoon-helper is a helper for icomoon custom font render with support multicolor

## Installation
```sh
Install: npm i icomoon-helper --save-exact
```

## General Usage
Create icon set manually or [icomoon-cli](https://github.com/axinvd/icomoon-cli.git)

```js
import {createIconSet} from 'icomoon-helper';

export const Icon = createIconSet('pathToIcomoon/selection.json');
```

## Rendering

Options color and opacity are optional, defaults like icon
```js
<Icon size={10} color={"red"} opacity={0.5}>
    {"iconName"}
</Icon>
```

For multicolor icons
```js
<Icon size={10} color={["red", "yellow"]} opacity={[0.5, 0.1]}>
    {"iconName"}
</Icon>
```