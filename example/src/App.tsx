import React from 'react'

import { Psychometrics } from 'psychometrics'
import 'psychometrics/dist/index.css'

const App = () => {
  return <Psychometrics configuration={require('./mock/configuration.json')} />
}

export default App
