const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create output directory
const outputDir = path.join(__dirname, 'assets');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Color palette - bright arcade colors
const COLORS = {
    cookieBase: '#D4A574',
    cookieDark: '#8B6914',
    cookieLight: '#F5DEB3',
    chocolate: '#3D2314',
    monsterBlue: '#4169E1',
    monsterDark: '#191970',
    monsterEye: '#FFFFFF',
    powerUpGold: '#FFD700',
    powerUpRed: '#FF4444',
    powerUpGreen: '#44FF44',
    background: '#1a1a2e',
    accentOrange: '#FF6B35',
    accentYellow: '#FFD23F',
    accentRed: '#FF4757'
};

// Helper: Draw a cookie
function drawCookie(ctx, x, y, size, hasBite = false) {
    ctx.save();
    ctx.translate(x, y);
    
    // Cookie base
    ctx.beginPath();
    if (hasBite) {
        ctx.arc(0, 0, size, 0.5, 5.5);
    } else {
        ctx.arc(0, 0, size, 0, Math.PI * 2);
    }
    ctx.fillStyle = COLORS.cookieBase;
    ctx.fill();
    ctx.strokeStyle = COLORS.cookieDark;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Chocolate chips
    const chips = [
        [-size*0.3, -size*0.2],
        [size*0.3, -size*0.3],
        [0, size*0.3],
        [-size*0.2, size*0.1],
        [size*0.2, 0]
    ];
    
    chips.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, size * 0.12, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.chocolate;
        ctx.fill();
    });
    
    ctx.restore();
}

// Helper: Draw cookie with face (for icon)
function drawCookieWithFace(ctx, x, y, size) {
    drawCookie(ctx, x, y, size);
    
    ctx.save();
    ctx.translate(x, y);
    
    // Eyes
    ctx.fillStyle = COLORS.chocolate;
    ctx.beginPath();
    ctx.arc(-size*0.25, -size*0.1, size*0.12, 0, Math.PI * 2);
    ctx.arc(size*0.25, -size*0.1, size*0.12, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye shine
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-size*0.22, -size*0.13, size*0.04, 0, Math.PI * 2);
    ctx.arc(size*0.28, -size*0.13, size*0.04, 0, Math.PI * 2);
    ctx.fill();
    
    // Big smile
    ctx.beginPath();
    ctx.arc(0, size*0.1, size*0.3, 0.2, Math.PI - 0.2);
    ctx.strokeStyle = COLORS.chocolate;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    ctx.restore();
}

// Helper: Draw monster
function drawMonster(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    
    // Body
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.monsterBlue;
    ctx.fill();
    ctx.strokeStyle = COLORS.monsterDark;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Spots
    ctx.fillStyle = COLORS.monsterDark;
    ctx.beginPath();
    ctx.arc(-size*0.3, -size*0.3, size*0.15, 0, Math.PI * 2);
    ctx.arc(size*0.4, size*0.2, size*0.1, 0, Math.PI * 2);
    ctx.arc(-size*0.2, size*0.4, size*0.12, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = COLORS.monsterEye;
    ctx.beginPath();
    ctx.ellipse(-size*0.25, -size*0.1, size*0.25, size*0.3, 0, 0, Math.PI * 2);
    ctx.ellipse(size*0.25, -size*0.1, size*0.25, size*0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = COLORS.monsterDark;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Pupils
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(-size*0.25, -size*0.1, size*0.1, 0, Math.PI * 2);
    ctx.arc(size*0.25, -size*0.1, size*0.1, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth
    ctx.beginPath();
    ctx.arc(0, size*0.25, size*0.25, 0.1, Math.PI - 0.1);
    ctx.fillStyle = '#330000';
    ctx.fill();
    
    // Teeth
    ctx.fillStyle = '#FFFFFF';
    for(let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-size*0.15 + i*size*0.15, size*0.35);
        ctx.lineTo(-size*0.1 + i*size*0.15, size*0.5);
        ctx.lineTo(-size*0.05 + i*size*0.15, size*0.35);
        ctx.fill();
    }
    
    ctx.restore();
}

// Helper: Draw power-up
function drawPowerUp(ctx, x, y, size, type) {
    ctx.save();
    ctx.translate(x, y);
    
    // Glow effect
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fill();
    
    // Power-up circle
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
    
    if (type === 'star') {
        ctx.fillStyle = COLORS.powerUpGold;
        ctx.fill();
        ctx.strokeStyle = '#FFA500';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Star symbol
        drawStar(ctx, 0, 0, 5, size*0.5, size*0.25);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
    } else if (type === 'heart') {
        ctx.fillStyle = COLORS.powerUpRed;
        ctx.fill();
        ctx.strokeStyle = '#CC0000';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Heart symbol
        drawHeart(ctx, 0, size*0.1, size*0.4);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
    } else if (type === 'bolt') {
        ctx.fillStyle = COLORS.powerUpGreen;
        ctx.fill();
        ctx.strokeStyle = '#00AA00';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Bolt symbol
        drawBolt(ctx, 0, 0, size*0.5);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
    }
    
    ctx.restore();
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
}

function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.quadraticCurveTo(x, y, x + size / 4, y);
    ctx.quadraticCurveTo(x + size / 2, y, x + size / 2, y + size / 4);
    ctx.quadraticCurveTo(x + size / 2, y, x + size * 3/4, y);
    ctx.quadraticCurveTo(x + size, y, x + size, y + size / 4);
    ctx.quadraticCurveTo(x + size, y + size / 2, x + size * 3/4, y + size * 3/4);
    ctx.lineTo(x + size / 2, y + size);
    ctx.lineTo(x + size / 4, y + size * 3/4);
    ctx.quadraticCurveTo(x, y + size / 2, x, y + size / 4);
    ctx.closePath();
}

function drawBolt(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x - size*0.2, y - size*0.4);
    ctx.lineTo(x + size*0.1, y - size*0.1);
    ctx.lineTo(x - size*0.1, y - size*0.1);
    ctx.lineTo(x + size*0.2, y + size*0.4);
    ctx.lineTo(x - size*0.1, y + size*0.1);
    ctx.lineTo(x + size*0.1, y + size*0.1);
    ctx.closePath();
}

// 1. GAME_ICON.png (512x512)
function generateGameIcon() {
    const size = 512;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Transparent background
    ctx.clearRect(0, 0, size, size);
    
    // Background glow
    const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    gradient.addColorStop(0, 'rgba(255, 200, 100, 0.3)');
    gradient.addColorStop(0.7, 'rgba(255, 150, 50, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Draw cookie with face
    drawCookieWithFace(ctx, size/2, size/2, 180);
    
    // Sparkles around cookie
    ctx.fillStyle = COLORS.accentYellow;
    const sparkles = [
        [80, 100], [430, 120], [100, 400], [420, 380], [60, 250], [450, 250]
    ];
    sparkles.forEach(([sx, sy]) => {
        drawStar(ctx, sx, sy, 4, 15, 7);
        ctx.fill();
    });
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, 'GAME_ICON.png'), buffer);
    console.log('✓ GAME_ICON.png generated (512x512)');
}

// 2. SOCIAL_CARD.png (1200x628)
function generateSocialCard() {
    const width = 1200;
    const height = 628;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Arcade gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Grid pattern
    ctx.strokeStyle = 'rgba(255, 107, 53, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }
    for (let i = 0; i < height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
    }
    
    // Title
    ctx.font = 'bold 80px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = COLORS.accentYellow;
    ctx.fillText('COOKIE CHALLENGE', width/2, 150);
    
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillText('COOKIE CHALLENGE', width/2 + 4, 154);
    
    // Subtitle
    ctx.font = 'italic 36px Arial, sans-serif';
    ctx.fillStyle = COLORS.accentOrange;
    ctx.fillText('Most Addictive Arcade Game', width/2, 210);
    
    // Draw characters
    drawCookieWithFace(ctx, 300, 400, 120);
    drawMonster(ctx, 500, 400, 100);
    drawMonster(ctx, 700, 420, 80);
    drawMonster(ctx, 900, 380, 90);
    
    // Power-ups
    drawPowerUp(ctx, 200, 320, 40, 'star');
    drawPowerUp(ctx, 1000, 320, 40, 'heart');
    drawPowerUp(ctx, 600, 520, 35, 'bolt');
    
    // Arcade border
    ctx.strokeStyle = COLORS.accentRed;
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, width - 40, height - 40);
    
    // Corner decorations
    ctx.fillStyle = COLORS.accentYellow;
    drawStar(ctx, 40, 40, 5, 20, 10);
    ctx.fill();
    drawStar(ctx, width - 40, 40, 5, 20, 10);
    ctx.fill();
    drawStar(ctx, 40, height - 40, 5, 20, 10);
    ctx.fill();
    drawStar(ctx, width - 40, height - 40, 5, 20, 10);
    ctx.fill();
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, 'SOCIAL_CARD.png'), buffer);
    console.log('✓ SOCIAL_CARD.png generated (1200x628)');
}

// 3. GAMEPLAY_PREVIEW.png (800x600)
function generateGameplayPreview() {
    const width = 800;
    const height = 600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Game background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#2d1b4e');
    gradient.addColorStop(1, '#1a0f2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Game grid floor
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 100);
        ctx.lineTo(i - 100, height);
        ctx.stroke();
    }
    
    // UI Header bar
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, width, 70);
    
    // Score
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = COLORS.accentYellow;
    ctx.fillText('SCORE: 12,450', 20, 45);
    
    // High score
    ctx.fillStyle = '#AAAAAA';
    ctx.font = '20px monospace';
    ctx.fillText('HI: 25,800', 20, 65);
    
    // Lives (cookies)
    ctx.textAlign = 'right';
    ctx.fillStyle = COLORS.accentYellow;
    ctx.font = 'bold 28px monospace';
    ctx.fillText('LIVES:', width - 180, 45);
    
    for (let i = 0; i < 3; i++) {
        drawCookie(ctx, width - 140 + i * 45, 35, 15);
    }
    
    // Level indicator
    ctx.fillStyle = COLORS.accentOrange;
    ctx.fillText('LEVEL 5', width/2, 45);
    
    // Game area border
    ctx.strokeStyle = COLORS.accentRed;
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 80, width - 20, height - 90);
    
    // Player cookie
    drawCookieWithFace(ctx, 400, 400, 50);
    
    // Enemies
    drawMonster(ctx, 200, 200, 40);
    drawMonster(ctx, 600, 250, 35);
    drawMonster(ctx, 300, 150, 30);
    drawMonster(ctx, 500, 180, 38);
    drawMonster(ctx, 150, 350, 32);
    drawMonster(ctx, 650, 400, 36);
    
    // Power-ups on screen
    drawPowerUp(ctx, 250, 300, 25, 'star');
    drawPowerUp(ctx, 550, 320, 25, 'heart');
    
    // Projectiles
    ctx.fillStyle = COLORS.accentYellow;
    ctx.beginPath();
    ctx.arc(400, 340, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(350, 380, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Power-up bar at bottom
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(150, height - 50, 500, 40);
    
    ctx.font = '16px monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('POWER-UPS:', 160, height - 25);
    
    drawPowerUp(ctx, 280, height - 30, 15, 'star');
    drawPowerUp(ctx, 320, height - 30, 15, 'heart');
    drawPowerUp(ctx, 360, height - 30, 15, 'bolt');
    
    // Pause button
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(width - 40, height - 30, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(width - 48, height - 40, 6, 20);
    ctx.fillRect(width - 38, height - 40, 6, 20);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, 'GAMEPLAY_PREVIEW.png'), buffer);
    console.log('✓ GAMEPLAY_PREVIEW.png generated (800x600)');
}

// 4. SPRITE_SHEET.png
function generateSpriteSheet() {
    const width = 256;
    const height = 256;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Transparent background
    ctx.clearRect(0, 0, width, height);
    
    // Grid layout: 4 columns, variable rows
    // Row 1: Player cookie (32x32) - 4 frames
    // Row 2: Monster (32x32) - 4 frames  
    // Row 3: Power-ups (16x16) - 3 types
    
    // Background for visibility
    ctx.fillStyle = 'rgba(30, 30, 50, 0.3)';
    ctx.fillRect(0, 0, width, height);
    
    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 8; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 32, 0);
        ctx.lineTo(i * 32, 128);
        ctx.stroke();
    }
    for (let i = 0; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * 32);
        ctx.lineTo(256, i * 32);
        ctx.stroke();
    }
    
    // Row 1: Player cookie sprites (frames 1-4)
    for (let i = 0; i < 4; i++) {
        const x = 16 + i * 64;
        const y = 16;
        drawCookie(ctx, x, y, 14);
        // Frame indicator
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`P${i+1}`, x, y + 26);
    }
    
    // Row 2: Monster sprites (frames 1-4)
    for (let i = 0; i < 4; i++) {
        const x = 16 + i * 64;
        const y = 48;
        drawMonster(ctx, x, y, 14);
        // Frame indicator
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`M${i+1}`, x, y + 26);
    }
    
    // Row 3: Power-ups (16x16 each)
    const powerUpTypes = ['star', 'heart', 'bolt'];
    for (let i = 0; i < 3; i++) {
        const x = 24 + i * 64;
        const y = 96;
        drawPowerUp(ctx, x, y, 12, powerUpTypes[i]);
        // Label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(powerUpTypes[i].toUpperCase(), x, y + 22);
    }
    
    // Legend/Labels
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('SPRITE SHEET - Cookie Challenge', 10, 150);
    ctx.font = '10px Arial';
    ctx.fillText('32x32 Player (Row 1) | 32x32 Monster (Row 2) | 16x16 Power-ups (Row 3)', 10, 165);
    
    // Show actual size previews
    ctx.fillText('PREVIEWS:', 10, 190);
    
    // Large preview of player
    drawCookieWithFace(ctx, 40, 220, 25);
    ctx.fillStyle = '#AAAAAA';
    ctx.font = '9px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('32x32', 40, 255);
    
    // Large preview of monster
    drawMonster(ctx, 120, 220, 25);
    ctx.fillText('32x32', 120, 255);
    
    // Large preview of power-ups
    drawPowerUp(ctx, 180, 215, 15, 'star');
    drawPowerUp(ctx, 210, 215, 15, 'heart');
    drawPowerUp(ctx, 235, 215, 15, 'bolt');
    ctx.fillText('16x16', 205, 255);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, 'SPRITE_SHEET.png'), buffer);
    console.log('✓ SPRITE_SHEET.png generated (256x256)');
}

// Generate all assets
console.log('🎮 Generating Cookie Challenge game graphics...\n');

generateGameIcon();
generateSocialCard();
generateGameplayPreview();
generateSpriteSheet();

console.log('\n✅ All graphics generated successfully!');
console.log(`📁 Output directory: ${outputDir}`);
