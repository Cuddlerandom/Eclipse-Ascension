import { WorldScene } from './scenes/WorldScene.js?v=4';
const status=document.querySelector('#status');if(!window.Phaser){status.textContent='Phaser konnte nicht geladen werden';throw new Error('Phaser CDN unavailable')}
const game=new Phaser.Game({type:Phaser.AUTO,parent:'game',backgroundColor:'#31543a',scale:{mode:Phaser.Scale.RESIZE,autoCenter:Phaser.Scale.CENTER_BOTH},render:{pixelArt:false,antialias:true},scene:[WorldScene]});
document.querySelector('#home').addEventListener('click',()=>{const scene=game.scene.getScene('WorldScene');scene.resetCamera()});
