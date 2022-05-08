const audio = {
    
    Map: new Howl({
        src: 'audio/map.wav',
        html5: true,
        volume: 0.3
    }),
    initBattle: new Howl({
        src: 'audio/initBattle.wav',
        html5: true,
        volume: 0.3
    }),
    battle: new Howl({
        src: 'audio/battle.mp3',
        html5: true,
        volume: 0.3
    }),
    tackleSound: new Howl({
        src: 'audio/tackleHit.wav',
        html5: true,
        volume: 0.3
    }),
    throwBallSound: new Howl({
        src: 'audio/fireballHit.wav',
        html5: true,
        volume: 0.3
    }),
    initThrowBallSound: new Howl({
        src: 'audio/initFireball.wav',
        html5: true,
        volume: 0.3
    }),
    victory: new Howl({
        src: 'audio/victory.wav',
        html5: true,
        volume: 0.3
    })
}