// ── Core types for BLASTFORGE ──
export const GRID_SIZE = 16;
export const TILE_WORLD_SIZE = 1.0;
export const SIM_RATE = 60;
export const SIM_DT = 1 / SIM_RATE;
export var TileType;
(function (TileType) {
    TileType[TileType["Floor"] = 0] = "Floor";
    TileType[TileType["HardBlock"] = 1] = "HardBlock";
    TileType[TileType["SoftBlock"] = 2] = "SoftBlock";
})(TileType || (TileType = {}));
export var FuseAction;
(function (FuseAction) {
    FuseAction["Prime"] = "prime";
    FuseAction["Rush"] = "rush";
    FuseAction["Detonate"] = "detonate";
})(FuseAction || (FuseAction = {}));
export var Direction;
(function (Direction) {
    Direction[Direction["None"] = 0] = "None";
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
export var PowerUpType;
(function (PowerUpType) {
    PowerUpType["BombRange"] = "bomb_range";
    PowerUpType["BombCount"] = "bomb_count";
    PowerUpType["Speed"] = "speed";
    PowerUpType["FuseCharge"] = "fuse_charge";
})(PowerUpType || (PowerUpType = {}));
//# sourceMappingURL=types.js.map