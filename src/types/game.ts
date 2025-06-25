
export enum GameState {
    Loading = "LOADING",
    Menu = "MENU",
    Playing = "PLAYING",
    Paused = "PAUSED",
    GameOver = "GAME_OVER",
    Victory = "VICTORY",
    Settings = "SETTINGS",
}

export interface GameData {
    state: GameState
    score: number
}

type Transitions = Record<GameState, GameState[]>

export const transitions: Transitions = { 
    [GameState.Loading]: [GameState.Menu],
    [GameState.Menu]: [GameState.Playing],
    [GameState.Playing]: [GameState.Paused, GameState.GameOver, GameState.Victory],
    [GameState.Paused]: [GameState.Playing],
    [GameState.GameOver]: [GameState.Menu],
    [GameState.Victory]: [GameState.Menu],
    [GameState.Settings]: [GameState.Menu],
}