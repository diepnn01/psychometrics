export interface Instructions {
  pre: string;
  post: string;
}

export interface Scenarios {
  grid: string;
  highlightedTiles: number;
  preDisplayTime: number;
  postDisplayTime: number;
}

export interface Positions {
  posx: number;
  posy: number;
}

export interface Status {
  isPause: boolean;
  isPre: boolean;
  isPost: boolean;
  showGrid: boolean;
}

export interface Configuration {
  instructions: Instructions;
  scenarios: Scenarios[];
}

export interface ResponseScenarios {
  highlightedTiles: Positions[];
  userResponse: Positions[];
}
