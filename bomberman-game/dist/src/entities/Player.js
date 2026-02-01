import * as THREE from 'three';
import { DEFAULT_PLAYER_SPEED, DEFAULT_BOMB_COUNT, DEFAULT_EXPLOSION_RANGE } from '../utils/Constants';
export class Player {
    gridX;
    gridY;
    worldX = 0;
    worldZ = 0;
    speed = DEFAULT_PLAYER_SPEED;
    bombsAvailable = DEFAULT_BOMB_COUNT;
    maxBombs = DEFAULT_BOMB_COUNT;
    explosionRange = DEFAULT_EXPLOSION_RANGE;
    health = 3;
    alive = true;
    invincibleTimer = 0;
    mesh;
    bodyMesh;
    constructor(gridX, gridY, grid) {
        this.gridX = gridX;
        this.gridY = gridY;
        const pos = grid.gridToWorld(gridX, gridY);
        this.worldX = pos.x;
        this.worldZ = pos.z;
        this.mesh = new THREE.Group();
        // Body
        const bodyGeo = new THREE.CapsuleGeometry(0.25, 0.3, 4, 8);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2196F3 });
        this.bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
        this.bodyMesh.position.y = 0.4;
        this.bodyMesh.castShadow = true;
        this.mesh.add(this.bodyMesh);
        // Eyes
        const eyeGeo = new THREE.SphereGeometry(0.06, 6, 6);
        const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
        leftEye.position.set(-0.1, 0.55, 0.2);
        this.mesh.add(leftEye);
        const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
        rightEye.position.set(0.1, 0.55, 0.2);
        this.mesh.add(rightEye);
        this.mesh.position.set(this.worldX, 0, this.worldZ);
    }
    update(dt, grid, input) {
        if (!this.alive)
            return;
        if (this.invincibleTimer > 0) {
            this.invincibleTimer -= dt;
            this.mesh.visible = Math.floor(this.invincibleTimer * 10) % 2 === 0;
        }
        else {
            this.mesh.visible = true;
        }
        const dir = input.getDirection();
        if (dir.x !== 0 || dir.y !== 0) {
            // Normalize for diagonal
            const len = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
            const nx = dir.x / len;
            const ny = dir.y / len;
            const newX = this.worldX + nx * this.speed * dt;
            const newZ = this.worldZ + ny * this.speed * dt;
            // Collision: check corners of bounding box
            const r = 0.35;
            const canMoveX = this.canMove(newX, this.worldZ, r, grid);
            const canMoveZ = this.canMove(this.worldX, newZ, r, grid);
            if (canMoveX)
                this.worldX = newX;
            if (canMoveZ)
                this.worldZ = newZ;
            // Face direction
            if (dir.x !== 0 || dir.y !== 0) {
                this.mesh.rotation.y = Math.atan2(dir.x, dir.y);
            }
        }
        this.mesh.position.set(this.worldX, 0, this.worldZ);
        const gp = grid.worldToGrid(this.worldX, this.worldZ);
        this.gridX = gp.x;
        this.gridY = gp.y;
        // Collect power-up
        const pu = grid.collectPowerUp(this.gridX, this.gridY);
        if (pu)
            this.applyPowerUp(pu);
    }
    canMove(wx, wz, r, grid) {
        const corners = [
            { x: wx - r, z: wz - r },
            { x: wx + r, z: wz - r },
            { x: wx - r, z: wz + r },
            { x: wx + r, z: wz + r },
        ];
        for (const c of corners) {
            const gp = grid.worldToGrid(c.x, c.z);
            const cell = grid.getCell(gp.x, gp.y);
            if (!cell || !cell.isWalkable())
                return false;
        }
        return true;
    }
    applyPowerUp(type) {
        switch (type) {
            case 'bomb':
                this.maxBombs++;
                this.bombsAvailable++;
                break;
            case 'fire':
                this.explosionRange++;
                break;
            case 'speed':
                this.speed += 0.5;
                break;
        }
    }
    takeDamage() {
        if (this.invincibleTimer > 0)
            return;
        this.health--;
        if (this.health <= 0) {
            this.alive = false;
            this.mesh.visible = false;
        }
        else {
            this.invincibleTimer = 2.0;
        }
    }
    returnBomb() {
        this.bombsAvailable = Math.min(this.bombsAvailable + 1, this.maxBombs);
    }
}
//# sourceMappingURL=Player.js.map