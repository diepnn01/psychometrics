# psychometrics

> Psychometric assessments

[![NPM](https://img.shields.io/npm/v/psychometrics.svg)](https://www.npmjs.com/package/psychometrics) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


> [🥳DEMO Psychometrics🥳](https://diepnn01.github.io/psychometrics)

## Install

```bash
yarn add psychometrics
```

## Usage

```tsx
import React, { Component } from 'react'

import { Psychometrics } from 'psychometrics'
import 'psychometrics/dist/index.css'

const configuration = {
    "instructions": {
        "pre": "Remember the highlighted tiles",
        "post": "Tap the highlighted tiles"
    },
    "scenarios": [
        {
            "grid": "2*2",
            "highlightedTiles": 1,
            "preDisplayTime": 1000,
            "postDisplayTime": 1000,
        }
    ]
}

class Example extends Component {
  render() {
    return <Psychometrics {...{configuration}}/>
  }
}
```

```
POC Details
* Create a react library using typescript for one of our psychometric assessments.
* Build using yarn
* The assessment configuration would be in json format
Configuration Items
================================
{
    "instructions": {
        "pre": "Remember the highlighted tiles",
        "post": "Tap the highlighted tiles"
    },
    "scenarios": [
        {
            "grid": "2*2",
            "highlightedTiles": 1,
            "preDisplayTime": 1000,
            "postDisplayTime": 1000,
        }, ......
    ]
}
* Instructions are shown before and after the highlighted tiles
* grid : This can have values like 2*2, 3*3, 4*4, 5*5 ..... n*n
* highlightedTiles : The number of tiles that are highlighted
UI Workflow
================================
* Check the video given to you. 
* At 0.16 seconds you are presented with a scenario with tiles highlighted. 
    ** Note the instructions at the bottom of the screen. This comes from {configuration.instructions.pre}. 
    ** This is a grid of size 3*3. In this case the {configuration.grid} => "3*3"
    ** This is shown for a maximum of {config.preDisplayTime} milliseconds
* At 0.17 seconds you are then presented with an empty grid
    ** Note the instructions at the bottom of the screen. This comes from {configuration.instructions.post}. 
    ** The user taps the grid to select tiles. This is recorded in a response object.
    ** Once the user taps the cells in the grid and makes a selection, it moves to the next scenario.
    ** In case the user does not make a selection, the system will navigate to the next scenario after a maximum of {configuration.postDisplayTime} milliseconds.
* This process continues till all the scenarios are complete. 
* At the end we can show a Thank you message and console.log the response
Response
================================
The response should be an array of objects. The javascript object will have the following properties
{
    "scenarios" : {
        "highlightedTiles": [
            {
                "posx": 0,
                "posy": 1
            }, 
            {
                "posx": 2,
                "posy": 2
            }
        ], 
        "userResponse": [
            {
                "posx": 0,
                "posy": 1
            }, 
            {
                "posx": 2,
                "posy": 2
            }
        ] ....., 
    }
}

```

## License

MIT © [diep-nguyen](https://github.com/diepnn01)
