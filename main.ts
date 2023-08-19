namespace SpriteKind {
    export const Ball = SpriteKind.create()
    export const Line = SpriteKind.create()
    export const Pigskin = SpriteKind.create()
    export const Quarterback = SpriteKind.create()
    export const Defense = SpriteKind.create()
    export const Offense = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (BallCaught == 1) {
        if (Down < 4) {
            Down += 1
            game.splash("A " + Math.round((sprite.x - LOS) / 16 * 5) + "yd play!")
            LOS = sprite.x
            sprites.destroyAllSpritesOfKind(SpriteKind.Player)
            sprites.destroyAllSpritesOfKind(SpriteKind.Line)
            sprites.destroyAllSpritesOfKind(SpriteKind.Offense)
            sprites.destroyAllSpritesOfKind(SpriteKind.Ball)
            sprites.destroyAllSpritesOfKind(SpriteKind.Quarterback)
            sprites.destroyAllSpritesOfKind(SpriteKind.Defense)
            playChosen = 0
        } else {
            game.gameOver(false)
        }
    }
})
sprites.onOverlap(SpriteKind.Line, SpriteKind.Quarterback, function (sprite, otherSprite) {
    if (BallThrown == 0) {
        if (Down < 4) {
            Down += 1
            game.splash("A " + Math.round((otherSprite.x - LOS) / 16 * 5) + "yd play!")
            LOS = otherSprite.x
            sprites.destroyAllSpritesOfKind(SpriteKind.Player)
            sprites.destroyAllSpritesOfKind(SpriteKind.Line)
            sprites.destroyAllSpritesOfKind(SpriteKind.Offense)
            sprites.destroyAllSpritesOfKind(SpriteKind.Ball)
            sprites.destroyAllSpritesOfKind(SpriteKind.Quarterback)
            sprites.destroyAllSpritesOfKind(SpriteKind.Defense)
            playChosen = 0
        } else {
            game.gameOver(false)
        }
    }
})
sprites.onOverlap(SpriteKind.Ball, SpriteKind.Player, function (sprite, otherSprite) {
    if (otherSprite.x + 2 >= DB1.x && otherSprite.x - 2 <= DB1.x && (otherSprite.y + 2 >= DB1.y && otherSprite.y - 2 <= DB1.y) || otherSprite.x + 2 >= DB2.x && otherSprite.x - 2 <= DB2.x && (otherSprite.y + 2 >= DB2.y && otherSprite.y - 2 <= DB2.y)) {
        if (Down < 4) {
            if (Math.percentChance(7.5)) {
                game.setGameOverMessage(false, "Interception!")
                game.gameOver(false)
            } else {
                animation.stopAnimation(animation.AnimationTypes.All, sprite)
                Down += 1
                game.splash("Incomplete!")
                sprites.destroyAllSpritesOfKind(SpriteKind.Player)
                sprites.destroyAllSpritesOfKind(SpriteKind.Line)
                sprites.destroyAllSpritesOfKind(SpriteKind.Offense)
                sprites.destroyAllSpritesOfKind(SpriteKind.Ball)
                sprites.destroyAllSpritesOfKind(SpriteKind.Quarterback)
                sprites.destroyAllSpritesOfKind(SpriteKind.Defense)
                playChosen = 0
            }
        } else {
            game.gameOver(false)
        }
    } else {
        BallCaught = 1
        scene.cameraFollowSprite(otherSprite)
        animation.stopAnimation(animation.AnimationTypes.All, Football)
        Football.setImage(img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            `)
        Football.follow(otherSprite, 52)
        WR1.follow(WR1)
        WR2.follow(WR2)
        animation.runImageAnimation(
        otherSprite,
        [img`
            . . . . 2 2 2 2 2 e . . . . . . 
            . . . 2 2 2 2 d 2 2 e . . . . . 
            . . e 2 2 2 2 2 2 2 e . . . . . 
            . . e 2 2 2 2 2 2 2 e . . . . . 
            . . e 2 2 2 2 2 e f f c c . . . 
            . . e e 2 2 e f f f f b c . . . 
            . e e e f e 2 b f f f d c . . . 
            e e 2 2 d f 2 e f f f b c . . . 
            e e 2 2 d f e c b 4 4 c . . . . 
            b 1 1 d e e c 4 1 1 4 c . . . . 
            . f f e e e e 4 4 4 4 c . . . . 
            . . f f d d e 4 4 4 b c . . . . 
            . . f f d d e c c c c d . . . . 
            . . . f f f f . . . . . . . . . 
            . . f f f e e e . . . . . . . . 
            . . f f f f e e e . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 2 2 2 2 e . . . . 
            . . . . . 2 2 2 2 d 2 2 e . . . 
            . . . . e 2 2 2 2 2 2 2 e . . . 
            . . . . e 2 2 2 2 2 2 2 e . . . 
            . . . . e 2 2 2 2 2 e f f c c . 
            . . . . e e 2 2 e f f f f b c . 
            . . . e e e f e e f f f f d c . 
            . . e e 2 2 d f c b 4 4 c b c . 
            . . e e 2 2 b c 4 1 1 4 c . . . 
            . . b 1 1 b e c 4 4 4 4 c . . . 
            . . f f f f d d 4 4 4 b c . . . 
            f f f f f f d d c c c c . . . . 
            f f f . f f f f c c c . . . . . 
            f f . . . . e e e . . . . . . . 
            . . . . . . e e e e . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 2 2 2 2 e . . . . 
            . . . . . 2 2 2 2 d 2 2 e . . . 
            . . . . e 2 2 2 2 2 2 2 e . . . 
            . . . . e 2 2 2 2 2 2 2 e . . . 
            . . . . e 2 2 2 2 2 e f f c c . 
            . . . . e e 2 2 e f f f f b c . 
            . . e e e f e e f f f f f d c . 
            . e e 2 2 d f c b 4 4 c 1 b c . 
            . e e 2 2 b c 4 1 1 4 c c . . . 
            . b 1 1 b e c 4 4 4 4 c . . . . 
            . . f f f d d 4 4 4 b c d . . . 
            e e f f f d d c c c c d d . . . 
            e e e f f f f c c c . . . . . . 
            e e . . . . f f f . . . . . . . 
            . . . . . . f f f f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 2 2 2 2 e . . . 
            . . . . . . 2 2 2 2 d 2 2 e . . 
            . . . . . e 2 2 2 2 2 2 2 e . . 
            . . . . . e 2 2 2 2 2 2 2 e . . 
            . . . . . e 2 2 2 2 2 e f f c c 
            . . . . . e e 2 2 e f f f f b c 
            . . . e e e f e 2 2 e f f f d c 
            . . e e 2 2 d f e 2 c b 4 4 c c 
            . . e e 2 2 d f e c 4 1 1 4 c . 
            . . b 1 1 d e e e c 4 4 4 4 c . 
            . . . f f f f f d d 4 4 4 b c . 
            . . . . f f f f d d c c c c . . 
            . . . . . f f f f f c c c . . . 
            . . . . e e e f f . . . . . . . 
            . . . . e e e e f f . . . . . . 
            `],
        150,
        true
        )
        controller.moveSprite(otherSprite, 50, 50)
        DB1.follow(otherSprite, randint(40, 60))
        DB2.follow(otherSprite, randint(40, 60))
        DB3.follow(otherSprite, randint(40, 60))
        DB4.follow(otherSprite, randint(40, 60))
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (playStarted == 1 && (BallThrown == 0 && QB.x < LOS)) {
        BallThrown = 1
        scene.cameraFollowSprite(Football)
        controller.moveSprite(WR2, 50, 50)
        Football.setKind(SpriteKind.Ball)
        animation.runImageAnimation(
        Football,
        [img`
            . . f f f f . . 
            . f 4 4 4 4 f . 
            f 4 4 1 1 4 4 f 
            f e e 4 4 4 4 f 
            . f e e e e f . 
            . . f f f f . . 
            `,img`
            . . f f f f . . 
            . f 4 4 4 4 f . 
            f 4 4 4 4 4 4 f 
            f e e 1 1 4 4 f 
            . f e e e e f . 
            . . f f f f . . 
            `,img`
            . . f f f f . . 
            . f 4 4 4 4 f . 
            f 4 4 4 4 4 4 f 
            f e e 4 4 4 4 f 
            . f e d d e f . 
            . . f f f f . . 
            `,img`
            . . f f f f . . 
            . f 4 4 4 4 f . 
            f 4 4 4 4 4 4 f 
            f e e 4 4 4 4 f 
            . f e e e e f . 
            . . f f f f . . 
            `,img`
            . . f f f f . . 
            . f 4 1 1 4 f . 
            f 4 4 4 4 4 4 f 
            f e e 4 4 4 4 f 
            . f e e e e f . 
            . . f f f f . . 
            `,img`
            . . f f f f . . 
            . f 4 4 4 4 f . 
            . f 4 1 1 4 4 f 
            . f e e 4 4 4 f 
            . . f e e e e f 
            . . . f f f f . 
            `],
        100,
        true
        )
        Football.follow(WR2, 120)
        animation.stopAnimation(animation.AnimationTypes.All, QB)
        QB.setImage(img`
            . . . . 2 2 2 2 2 e . . . . . . 
            . . . 2 2 2 2 d 2 2 e . . . . . 
            . . e 2 2 2 2 2 2 2 e . . . . . 
            . . e 2 2 2 2 2 2 2 e . . . . . 
            . . e 2 2 2 2 2 e f f c c . . . 
            . . e e 2 2 e f f f f b c . . . 
            . e e e f e 2 b f f f d c . . . 
            e e 2 2 d f 2 1 1 1 1 b c . . . 
            e e 2 2 d f e e c c c . . . . . 
            b 1 1 d e 2 2 e e c . . . . . . 
            . f f e 2 2 2 2 e . . . . . . . 
            . . f f d d 2 2 f f d d . . . . 
            . . f f d d e e f f d d . . . . 
            . . . f f f f . . . . . . . . . 
            . . e e e f f f . . . . . . . . 
            . . e e e e f f f . . . . . . . 
            `)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (playStarted == 1 && (BallThrown == 0 && QB.x < LOS)) {
        BallThrown = 1
        scene.cameraFollowSprite(Football)
        controller.moveSprite(WR1, 50, 50)
        Football.setKind(SpriteKind.Ball)
        animation.runImageAnimation(
        Football,
        [img`
            . . f f f f . . 
            . f 4 4 4 4 f . 
            f 4 4 1 1 4 4 f 
            f e e 4 4 4 4 f 
            . f e e e e f . 
            . . f f f f . . 
            `,img`
            . . f f f f . . 
            . f 4 4 4 4 f . 
            f 4 4 4 4 4 4 f 
            f e e 1 1 4 4 f 
            . f e e e e f . 
            . . f f f f . . 
            `,img`
            . . f f f f . . 
            . f 4 4 4 4 f . 
            f 4 4 4 4 4 4 f 
            f e e 4 4 4 4 f 
            . f e d d e f . 
            . . f f f f . . 
            `,img`
            . . f f f f . . 
            . f 4 4 4 4 f . 
            f 4 4 4 4 4 4 f 
            f e e 4 4 4 4 f 
            . f e e e e f . 
            . . f f f f . . 
            `,img`
            . . f f f f . . 
            . f 4 1 1 4 f . 
            f 4 4 4 4 4 4 f 
            f e e 4 4 4 4 f 
            . f e e e e f . 
            . . f f f f . . 
            `,img`
            . . f f f f . . 
            . f 4 4 4 4 f . 
            . f 4 1 1 4 4 f 
            . f e e 4 4 4 f 
            . . f e e e e f 
            . . . f f f f . 
            `],
        100,
        true
        )
        Football.follow(WR1, 75)
        animation.stopAnimation(animation.AnimationTypes.All, QB)
        QB.setImage(img`
            . . . . 2 2 2 2 2 e . . . . . . 
            . . . 2 2 2 2 d 2 2 e . . . . . 
            . . e 2 2 2 2 2 2 2 e . . . . . 
            . . e 2 2 2 2 2 2 2 e . . . . . 
            . . e 2 2 2 2 2 e f f c c . . . 
            . . e e 2 2 e f f f f b c . . . 
            . e e e f e 2 b f f f d c . . . 
            e e 2 2 d f 2 1 1 1 1 b c . . . 
            e e 2 2 d f e e c c c . . . . . 
            b 1 1 d e 2 2 e e c . . . . . . 
            . f f e 2 2 2 2 e . . . . . . . 
            . . f f d d 2 2 f f d d . . . . 
            . . f f d d e e f f d d . . . . 
            . . . f f f f . . . . . . . . . 
            . . e e e f f f . . . . . . . . 
            . . e e e e f f f . . . . . . . 
            `)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile9`, function (sprite, location) {
    if (BallCaught == 0) {
        animation.stopAnimation(animation.AnimationTypes.All, sprite)
        if (location.y > 8) {
            sprite.y += 1
        } else {
            sprite.y += -1
        }
        sprite.setVelocity(0, 0)
        sprite.setImage(img`
            . . . . . . e 2 2 2 2 2 . . . . 
            . . . . . e 2 2 d 2 2 2 2 . . . 
            . . . . . e 2 2 2 2 2 2 2 e . . 
            . . . . . e 2 2 2 2 2 2 2 e . . 
            . . . c c f f e 2 2 2 2 2 e . . 
            . . . c b f f f f e 2 2 e e . . 
            . . . c d f f f b 2 e f e e e . 
            . . . c b 1 1 1 1 2 f d 2 2 e e 
            . . . . . c c c e e f d 2 2 e e 
            . . . . . . c e e 2 2 e d 1 1 b 
            . . . . . . . e 2 2 2 2 e f f . 
            . . . . d d f f 2 2 d d f f . . 
            . . . . d d f f e e d d f f . . 
            . . . . . . . . . f f f f . . . 
            . . . . . . . . f f f e e e . . 
            . . . . . . . f f f e e e e . . 
            `)
    }
})
sprites.onOverlap(SpriteKind.Defense, SpriteKind.Quarterback, function (sprite, otherSprite) {
    if (BallThrown == 0 && (sprite.x + 2 >= Football.x && sprite.x - 2 <= Football.x && (sprite.y + 2 >= Football.y && sprite.y - 2 <= Football.y))) {
        if (Down < 4) {
            Down += 1
            game.splash("A " + Math.round((otherSprite.x - LOS) / 16 * 5) + "yd play!")
            LOS = otherSprite.x
            sprites.destroyAllSpritesOfKind(SpriteKind.Player)
            sprites.destroyAllSpritesOfKind(SpriteKind.Line)
            sprites.destroyAllSpritesOfKind(SpriteKind.Offense)
            sprites.destroyAllSpritesOfKind(SpriteKind.Ball)
            sprites.destroyAllSpritesOfKind(SpriteKind.Quarterback)
            sprites.destroyAllSpritesOfKind(SpriteKind.Defense)
            playChosen = 0
        } else {
            game.gameOver(false)
        }
    }
})
scene.onHitWall(SpriteKind.Quarterback, function (sprite, location) {
    if (BallThrown == 0) {
        if (Down < 4) {
            Down += 1
            game.splash("A " + Math.round((sprite.x - LOS) / 16 * 5) + "yd play!")
            LOS = sprite.x
            sprites.destroyAllSpritesOfKind(SpriteKind.Player)
            sprites.destroyAllSpritesOfKind(SpriteKind.Line)
            sprites.destroyAllSpritesOfKind(SpriteKind.Offense)
            sprites.destroyAllSpritesOfKind(SpriteKind.Ball)
            sprites.destroyAllSpritesOfKind(SpriteKind.Quarterback)
            sprites.destroyAllSpritesOfKind(SpriteKind.Defense)
            playChosen = 0
        } else {
            game.gameOver(false)
        }
    }
})
sprites.onOverlap(SpriteKind.Defense, SpriteKind.Player, function (sprite, otherSprite) {
    if (BallCaught == 1 && (sprite.x + 2 >= Football.x && sprite.x - 2 <= Football.x && (sprite.y + 2 >= Football.y && sprite.y - 2 <= Football.y))) {
        if (Down < 4) {
            Down += 1
            game.splash("A " + Math.round((sprite.x - LOS) / 16 * 5) + "yd play!")
            LOS = otherSprite.x
            sprites.destroyAllSpritesOfKind(SpriteKind.Player)
            sprites.destroyAllSpritesOfKind(SpriteKind.Line)
            sprites.destroyAllSpritesOfKind(SpriteKind.Offense)
            sprites.destroyAllSpritesOfKind(SpriteKind.Ball)
            sprites.destroyAllSpritesOfKind(SpriteKind.Quarterback)
            sprites.destroyAllSpritesOfKind(SpriteKind.Defense)
            playChosen = 0
        } else {
            game.gameOver(false)
        }
    }
})
sprites.onOverlap(SpriteKind.Pigskin, SpriteKind.Quarterback, function (sprite, otherSprite) {
    Football.setImage(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        `)
    BallCaught = 0
    animation.stopAnimation(animation.AnimationTypes.All, Football)
    Football.setVelocity(0, 0)
})
let DLine: Sprite = null
let OLine: Sprite = null
let HB: Sprite = null
let QBRunning = 0
let QB: Sprite = null
let playStarted = 0
let DB4: Sprite = null
let DB3: Sprite = null
let WR2: Sprite = null
let WR1: Sprite = null
let Football: Sprite = null
let DB2: Sprite = null
let DB1: Sprite = null
let BallThrown = 0
let BallCaught = 0
let Down = 0
let playChosen = 0
let LOS = 0
LOS = 105
playChosen = 0
Down = 1
game.splash("Score: 14-10", "We need another touchdown!")
game.setGameOverMessage(false, "Turnover on downs!")
game.setGameOverMessage(true, "TOUCHDOWN!!!")
tiles.setCurrentTilemap(tilemap`level1`)
forever(function () {
    if (playStarted == 1) {
        if (DB3.x + 40 >= WR1.x && DB3.x - 40 <= WR1.x && (DB3.y + 40 >= WR1.y && DB3.y - 40 <= WR1.y)) {
            DB3.follow(WR1, randint(40, 60))
        }
        if (DB3.x + 40 >= WR2.x && DB3.x - 40 <= WR2.x && (DB3.y + 40 >= WR2.y && DB3.y - 40 <= WR2.y)) {
            DB3.follow(WR2, randint(40, 60))
        }
        if (DB4.x + 40 >= WR1.x && DB4.x - 40 <= WR1.x && (DB4.y + 40 >= WR1.y && DB4.y - 40 <= WR1.y)) {
            DB4.follow(WR1, randint(40, 60))
        }
        if (DB4.x + 40 >= WR2.x && DB4.x - 40 <= WR2.x && (DB4.y + 40 >= WR2.y && DB4.y - 40 <= WR2.y)) {
            DB4.follow(WR2, randint(40, 60))
        }
        if (playStarted == 1 && (BallCaught == 1 && Football.x >= 390)) {
            game.gameOver(true)
        }
    }
})
forever(function () {
    if (playChosen == 0) {
        tiles.setCurrentTilemap(tilemap`level2`)
        scene.setBackgroundImage(img`
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffff1111111111111111111111111111111111111111111111111111111111111fffffffffffffffffff1111111111111111111111111111111111111111111111111111111111111fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffffffffff2222fffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffff222fffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffffffffffffff2ffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffffffffff22f2fffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffff2fffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffff22ff2fffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffff2222222222222ffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffffffff22fffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffff2222222222222ffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffff22ffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffff2fffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffffff22fffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22ffffffff2ffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffff22ffffffffffffffffffffffffffff2fffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffff22ffffffffffffffffffffffffffff2ffffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffff22fffffffffffffffffffffffffff22222222222222ffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffff22fffffffffffffffffffffffffff22222222222222ffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffff22ffffffffffffffffffffffffffff2ffffffffff22ffffffff1fffffffff
            ffffffffff1ffffffff22ffffffffffffffffffffffffffffffff2ffffffffffffffff1fffffffffffffffffff1ffffffff22fffffffffffffffffffffffffffff2fffffffff22ffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffff2fffffffffffffffff1fffffffffffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffff
            ffffffffff1ffffffff22ffffffffffffffffffffffffffffff22222222222ffffffff1fffffffffffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffff
            ffffffffff1ffffffff22ffffffffffffffffffffffffffffff22222222222ffffffff1fffffffffffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffff2fffffff22ffffffff1fffffffffffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffff
            ffffffffff1ffffffff22ffffffffffffffffffffffffffffffff2ffffff22ffffffff1fffffffffffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffff
            ffffffffff155f55f55225f55f55f55f55f55f55f55f55f55f55f55f55f52255f55f551fffffffffffffffffff155f55f55225f55f55f55f55f55f55f55f55f55f55f55f55f52255f55f551fffffffff
            ffffffffff1ffffffff11ffffff11ff11ff11ff11ff11ff11ff11fffffff11ffffffff1fffffffffffffffffff1ffffffff11ffffff11ff11ff11ff11ff11ff11ff11fffffff11ffffffff1fffffffff
            ffffffffff1fffffff1ff1ffff1ff11ff11ff11ff11ff11ff11ff1fffff1ff1fffffff1fffffffffffffffffff1fffffff1ff1ffff1ff11ff11ff11ff11ff11ff11ff1fffff1ff1fffffff1fffffffff
            ffffffffff1fffffff1ff1ffff1ff11ff11ff11ff11ff11ff11ff1fffff1ff1fffffff1fffffffffffffffffff1fffffff1ff1ffff1ff11ff11ff11ff11ff11ff11ff1fffff1ff1fffffff1fffffffff
            ffffffffff1ffffffff11ffffff11ff11ff11ff11ff11ff11ff11fffffff11ffffffff1fffffffffffffffffff1ffffffff11ffffff11ff11ff11ff11ff11ff11ff11fffffff11ffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffffffffffffffffffffffff11fffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffffffffffffffffffffffff11fffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffff1ff1ffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffff1ff1ffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffff1ff1ffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffff1ff1ffffffffffffffffffffffffffff13ffffffff
            ffffffffff1fffffffffffffffffffffff11fff11fffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffff11fff11fffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffffffffffffffffff1ff1fffffffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffffffffffffffffff1ff1fffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffffffffffffffffff1ff1fffffffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffffffffffffffffff1ff1fffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffff11ffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffff11ffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1111111111111111111111111111111111111111111111111111111111111fffffffffffffffffff1111111111111111111111111111111111111111111111111111111111111fffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffff1f11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fff1fffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffff1ff11fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffff1fffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffff11fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffff11fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffff11111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111111ffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffff1111111111111111111111111111111111111111111111111111111111111fffffffffffffffffff1111111111111111111111111111111111111111111111111111111111111fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffff2222fffffffffffffffffffffffffffffffffffff2222fffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffff2f22f2fffffffffffffffffffffffffffffffffff2f22f2ffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1ffffffffffffffffff2fffffffffffffffffffff2ffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1fffffffffffffffffff2fffffffffffffffffff2fffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1ffffffffffffffffffff2fffffffffffffffff2ffffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1ffffffffffffffffff222fffffffffffffffff222ffffffffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1ffffffffffff222222222fffffffffffffffff222222222ffffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1ffffffffff22222222ff2fffffffffffffffff2ff22222222ffffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1ffffffff22222ffffff2fffffffffffffffffff2ffffff22222ffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1ffffffff222fffffff2fffffffffffffffffffff2fffffff222ffffffff1fffffffff
            ffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffffffffffffff1ffffffff22fffffffffffffffffffffffffffffffffffffff22ffffffff1fffffffff
            ffffffffff155f55f55225f55f55f55f55f55f55f55f55f55f55f55f55f52255f55f551fffffffffffffffffff155f55f55225f55f55f55f55f55f55f55f55f55f55f55f55f52255f55f551fffffffff
            ffffffffff1ffffffff11ffffff11ff11ff11ff11ff11ff11ff11fffffff11ffffffff1fffffffffffffffffff1ffffffff11ffffff11ff11ff11ff11ff11ff11ff11fffffff11ffffffff1fffffffff
            ffffffffff1fffffff1ff1ffff1ff11ff11ff11ff11ff11ff11ff1fffff1ff1fffffff1fffffffffffffffffff1fffffff1ff1ffff1ff11ff11ff11ff11ff11ff11ff1fffff1ff1fffffff1fffffffff
            ffffffffff1fffffff1ff1ffff1ff11ff11ff11ff11ff11ff11ff1fffff1ff1fffffff1fffffffffffffffffff1fffffff1ff1ffff1ff11ff11ff11ff11ff11ff11ff1fffff1ff1fffffff1fffffffff
            ffffffffff1ffffffff11ffffff11ff11ff11ff11ff11ff11ff11fffffff11ffffffff1fffffffffffffffffff1ffffffff11ffffff11ff11ff11ff11ff11ff11ff11fffffff11ffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffffffffffffffffffffffff11fffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffffffffffffffffffffffff11fffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffff1ff1ffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffff1ff1ffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffff1ff1ffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffff1ff1ffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffff11fff11fffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffff11fff11fffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffffffffffffffffff1ff1fffffffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffffffffffffffffff1ff1fffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1ffffffffffffffffffffff1ff1fffffffffffffffffffffffffffffffff1fffffffffffffffffff1ffffffffffffffffffffff1ff1fffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffff11ffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffff11ffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
            ffffffffff1111111111111111111111111111111111111111111111111111111111111fffffffffffffffffff1111111111111111111111111111111111111111111111111111111111111fffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fff1fffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffff1fff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fff1fffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fff1fffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffff111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111111fffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffff1fff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            `)
        if (Down == 1) {
            game.splash("" + Down + "st Down")
        } else if (Down == 2) {
            game.splash("" + Down + "nd Down")
        } else if (Down == 3) {
            game.splash("" + Down + "rd Down")
        } else {
            game.splash("" + Down + "th Down", "Last Chance!")
        }
        pause(5000)
        while (!(playChosen == 1 || playChosen == 2 || (playChosen == 3 || playChosen == 4))) {
            playChosen = game.askForNumber("What play?", 1)
        }
        playStarted = 0
        QBRunning = 0
    }
})
forever(function () {
    if (playChosen == 1 && playStarted == 0) {
        if (playStarted == 0) {
            tiles.setCurrentTilemap(tilemap`level1`)
            QB = sprites.create(img`
                . . . . 2 2 2 2 2 e . . . . . . 
                . . . 2 2 2 2 d 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 e f f c c . . . 
                . . e e 2 2 e f f f f b c . . . 
                . e e e f e 2 b f f f d c . . . 
                e e 2 2 d f 2 e f f f b c . . . 
                e e 2 2 d f e c b 4 4 c . . . . 
                b 1 1 d e e c 4 1 1 4 c . . . . 
                . f f e e e e 4 4 4 4 c . . . . 
                . . f f d d e 4 4 4 b c . . . . 
                . . f f d d e c c c c d . . . . 
                . . . f f f f . . . . . . . . . 
                . . f f f e e e . . . . . . . . 
                . . f f f f e e e . . . . . . . 
                `, SpriteKind.Quarterback)
            QB.setPosition(LOS - 29, 120)
            HB = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 2 2 2 e . . . 
                . . . . . . 2 2 2 2 d 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 e f f c c 
                . . . . . e e 2 2 e f f f f b c 
                . . . e e e f e 2 2 b f f f d c 
                . . e e 2 2 d f e 2 1 1 1 1 b c 
                . . e e 2 2 d f e e e c c c . . 
                . . b 1 1 d e 2 2 e e c . . . . 
                . . . f f f d d 2 2 f d d . . . 
                . . . . f f d d e e f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . e e e f f . . . . . . . 
                . . . . e e e e f f . . . . . . 
                `, SpriteKind.Player)
            HB.setPosition(LOS - 35, 100)
            OLine = sprites.create(img`
                ................
                .......22222e...
                ......2222d22e..
                .....e2222222e..
                .....e2222222e..
                .....e22222effcc
                .....e222222efbc
                ...ee22222d22edc
                ..eee22222222ebc
                ..eee22222222e..
                ..b1e222222effcc
                ...fee222222efbc
                ..eee22222d22edc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffee222222efbc
                ..eee22222d22edc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffee222effffbc
                ..eeef222222efdc
                .ee2222222d22ebc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffee222effffbc
                ..eeef222222efdc
                .ee2222222d22ebc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffe222222effcc
                ...fee222222efbc
                ..eee22222d22edc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                .b11ee222effffbc
                ..eeefe222bfffdc
                .ee22dfee21111bc
                .ee22dfeeeeccc..
                .b11de222eec....
                ..fffdd222fdd...
                ...ffddeeefdd...
                ....ffffff......
                ...eeefff.......
                `, SpriteKind.Offense)
            OLine.setPosition(LOS, 120)
            WR1 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `, SpriteKind.Player)
            WR1.setPosition(LOS, 80)
            WR2 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `, SpriteKind.Player)
            WR2.setPosition(LOS, 160)
            scene.centerCameraAt(QB.x + 55, 120)
            DLine = sprites.create(img`
                ................
                ...866666.......
                ..866d6666......
                ..866666668.....
                ..866666668.....
                ccff8666668.....
                cbf86666668.....
                cd866d6666688...
                cb866666666888..
                ..866666666888..
                ccff866666681b..
                cbf866666688f...
                cd866d66666888..
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbf866666688ff..
                cd866d66666888..
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbffff866688ff..
                cdf8666666f888..
                cb866d666666688.
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbffff866688ff..
                cdf8666666f888..
                cb866d666666688.
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                ccff86666668ff..
                cbf866666688f...
                cd866d66666888..
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbffff86668811b.
                cdfffb6668f888..
                cb1111688fd6688.
                ..ccc8888fd6688.
                ....c886668d11b.
                ...ddf666ddfff..
                ...ddf888ddff...
                ......ffffff....
                .......fff888...
                `, SpriteKind.Line)
            DLine.setPosition(LOS + 25, 120)
            DB1 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB1.setPosition(LOS + 25, 80)
            DB2 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB2.setPosition(LOS + 25, 160)
            DB3 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB3.setPosition(LOS + 80, 135)
            DB4 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB4.setPosition(LOS + 80, 105)
            Football = sprites.create(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                `, SpriteKind.Pigskin)
            Football.setPosition(LOS, 130)
            pause(100)
            BallCaught = 1
            game.splash("Hut Hut, Hike!")
            playStarted = 1
            Football.setImage(img`
                . . f f f f . . 
                . f 4 4 4 4 f . 
                f 4 4 1 1 4 4 f 
                f e e 4 4 4 4 f 
                . f e e e e f . 
                . . f f f f . . 
                `)
        }
        if (playStarted == 1) {
            Football.follow(QB, 100)
            BallThrown = 0
            animation.runImageAnimation(
            WR1,
            [img`
                . . . . 2 2 2 2 2 e . . . . . . 
                . . . 2 2 2 2 d 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 e f f c c . . . 
                . . e e 2 2 e f f f f b c . . . 
                . e e e f e 2 b f f f d c . . . 
                e e 2 2 d f 2 1 1 1 1 b c . . . 
                e e 2 2 d f e e c c c . . . . . 
                b 1 1 d e 2 2 e e c . . . . . . 
                . f f e 2 2 2 2 e . . . . . . . 
                . . f f d d 2 2 f f d d . . . . 
                . . f f d d e e f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . e e e f f f . . . . . . . . 
                . . e e e e f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . e e e f e 2 2 b f f f d c . 
                . e e 2 2 d f e 2 1 1 1 1 b c . 
                . e e 2 2 d f e e e c c c . . . 
                . b 1 1 e e 2 2 e e c . . . . . 
                . . f d d 2 2 2 f f f d d . . . 
                e e f d d e e e . f f d d . . . 
                e e e f f f f f . . . . . . . . 
                e e . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 2 2 2 e . . . 
                . . . . . . 2 2 2 2 d 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 e f f c c 
                . . . . . e e 2 2 e f f f f b c 
                . . . e e e f e 2 2 b f f f d c 
                . . e e 2 2 d f e 2 1 1 1 1 b c 
                . . e e 2 2 d f e e e c c c . . 
                . . b 1 1 d e 2 2 e e c . . . . 
                . . . f f f d d 2 2 f d d . . . 
                . . . . f f d d e e f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . e e e f f . . . . . . . 
                . . . . e e e e f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            WR2,
            [img`
                . . . . 2 2 2 2 2 e . . . . . . 
                . . . 2 2 2 2 d 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 e f f c c . . . 
                . . e e 2 2 e f f f f b c . . . 
                . e e e f e 2 b f f f d c . . . 
                e e 2 2 d f 2 1 1 1 1 b c . . . 
                e e 2 2 d f e e c c c . . . . . 
                b 1 1 d e 2 2 e e c . . . . . . 
                . f f e 2 2 2 2 e . . . . . . . 
                . . f f d d 2 2 f f d d . . . . 
                . . f f d d e e f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . e e e f f f . . . . . . . . 
                . . e e e e f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . e e e f e 2 2 b f f f d c . 
                . e e 2 2 d f e 2 1 1 1 1 b c . 
                . e e 2 2 d f e e e c c c . . . 
                . b 1 1 e e 2 2 e e c . . . . . 
                . . f d d 2 2 2 f f f d d . . . 
                e e f d d e e e . f f d d . . . 
                e e e f f f f f . . . . . . . . 
                e e . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 2 2 2 e . . . 
                . . . . . . 2 2 2 2 d 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 e f f c c 
                . . . . . e e 2 2 e f f f f b c 
                . . . e e e f e 2 2 b f f f d c 
                . . e e 2 2 d f e 2 1 1 1 1 b c 
                . . e e 2 2 d f e e e c c c . . 
                . . b 1 1 d e 2 2 e e c . . . . 
                . . . f f f d d 2 2 f d d . . . 
                . . . . f f d d e e f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . e e e f f . . . . . . . 
                . . . . e e e e f f . . . . . . 
                `],
            150,
            true
            )
            WR1.setVelocity(50, 0)
            WR2.setVelocity(50, 0)
            for (let index = 0; index < 5; index++) {
                OLine.x += 1
                pause(20)
                DLine.x += -1
            }
            pause(500)
            DB1.follow(WR1, randint(40, 60))
            DB2.follow(WR2, randint(40, 60))
            animation.runImageAnimation(
            DB1,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            DB2,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            DB3,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            DB4,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            pause(400)
            WR2.setVelocity(0, -50)
            pause(1000)
            WR1.setVelocity(0, 50)
            pause(2500)
            DLine.follow(QB, 50)
        }
    }
})
forever(function () {
    if (playChosen == 3 && playStarted == 0) {
        if (playStarted == 0) {
            tiles.setCurrentTilemap(tilemap`level1`)
            QB = sprites.create(img`
                . . . . 2 2 2 2 2 e . . . . . . 
                . . . 2 2 2 2 d 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 e f f c c . . . 
                . . e e 2 2 e f f f f b c . . . 
                . e e e f e 2 b f f f d c . . . 
                e e 2 2 d f 2 e f f f b c . . . 
                e e 2 2 d f e c b 4 4 c . . . . 
                b 1 1 d e e c 4 1 1 4 c . . . . 
                . f f e e e e 4 4 4 4 c . . . . 
                . . f f d d e 4 4 4 b c . . . . 
                . . f f d d e c c c c d . . . . 
                . . . f f f f . . . . . . . . . 
                . . f f f e e e . . . . . . . . 
                . . f f f f e e e . . . . . . . 
                `, SpriteKind.Quarterback)
            QB.setPosition(LOS - 29, 120)
            HB = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 2 2 2 e . . . 
                . . . . . . 2 2 2 2 d 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 e f f c c 
                . . . . . e e 2 2 e f f f f b c 
                . . . e e e f e 2 2 b f f f d c 
                . . e e 2 2 d f e 2 1 1 1 1 b c 
                . . e e 2 2 d f e e e c c c . . 
                . . b 1 1 d e 2 2 e e c . . . . 
                . . . f f f d d 2 2 f d d . . . 
                . . . . f f d d e e f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . e e e f f . . . . . . . 
                . . . . e e e e f f . . . . . . 
                `, SpriteKind.Player)
            HB.setPosition(LOS - 35, 100)
            OLine = sprites.create(img`
                ................
                .......22222e...
                ......2222d22e..
                .....e2222222e..
                .....e2222222e..
                .....e22222effcc
                .....e222222efbc
                ...ee22222d22edc
                ..eee22222222ebc
                ..eee22222222e..
                ..b1e222222effcc
                ...fee222222efbc
                ..eee22222d22edc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffee222222efbc
                ..eee22222d22edc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffee222effffbc
                ..eeef222222efdc
                .ee2222222d22ebc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffee222effffbc
                ..eeef222222efdc
                .ee2222222d22ebc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffe222222effcc
                ...fee222222efbc
                ..eee22222d22edc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                .b11ee222effffbc
                ..eeefe222bfffdc
                .ee22dfee21111bc
                .ee22dfeeeeccc..
                .b11de222eec....
                ..fffdd222fdd...
                ...ffddeeefdd...
                ....ffffff......
                ...eeefff.......
                `, SpriteKind.Offense)
            OLine.setPosition(LOS, 120)
            WR1 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `, SpriteKind.Player)
            WR1.setPosition(LOS, 80)
            WR2 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `, SpriteKind.Player)
            WR2.setPosition(LOS, 160)
            scene.centerCameraAt(QB.x + 55, 120)
            DLine = sprites.create(img`
                ................
                ...866666.......
                ..866d6666......
                ..866666668.....
                ..866666668.....
                ccff8666668.....
                cbf86666668.....
                cd866d6666688...
                cb866666666888..
                ..866666666888..
                ccff866666681b..
                cbf866666688f...
                cd866d66666888..
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbf866666688ff..
                cd866d66666888..
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbffff866688ff..
                cdf8666666f888..
                cb866d666666688.
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbffff866688ff..
                cdf8666666f888..
                cb866d666666688.
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                ccff86666668ff..
                cbf866666688f...
                cd866d66666888..
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbffff86668811b.
                cdfffb6668f888..
                cb1111688fd6688.
                ..ccc8888fd6688.
                ....c886668d11b.
                ...ddf666ddfff..
                ...ddf888ddff...
                ......ffffff....
                .......fff888...
                `, SpriteKind.Line)
            DLine.setPosition(LOS + 25, 120)
            DB1 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB1.setPosition(LOS + 25, 80)
            DB2 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB2.setPosition(LOS + 25, 160)
            DB3 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB3.setPosition(LOS + 80, 135)
            DB4 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB4.setPosition(LOS + 80, 105)
            Football = sprites.create(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                `, SpriteKind.Pigskin)
            Football.setPosition(LOS, 130)
            pause(100)
            BallCaught = 1
            game.splash("Hut Hut, Hike!")
            playStarted = 1
            Football.setImage(img`
                . . f f f f . . 
                . f 4 4 4 4 f . 
                f 4 4 1 1 4 4 f 
                f e e 4 4 4 4 f 
                . f e e e e f . 
                . . f f f f . . 
                `)
        }
        if (playStarted == 1) {
            Football.follow(QB, 100)
            BallThrown = 0
            animation.runImageAnimation(
            WR1,
            [img`
                . . . . 2 2 2 2 2 e . . . . . . 
                . . . 2 2 2 2 d 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 e f f c c . . . 
                . . e e 2 2 e f f f f b c . . . 
                . e e e f e 2 b f f f d c . . . 
                e e 2 2 d f 2 1 1 1 1 b c . . . 
                e e 2 2 d f e e c c c . . . . . 
                b 1 1 d e 2 2 e e c . . . . . . 
                . f f e 2 2 2 2 e . . . . . . . 
                . . f f d d 2 2 f f d d . . . . 
                . . f f d d e e f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . e e e f f f . . . . . . . . 
                . . e e e e f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . e e e f e 2 2 b f f f d c . 
                . e e 2 2 d f e 2 1 1 1 1 b c . 
                . e e 2 2 d f e e e c c c . . . 
                . b 1 1 e e 2 2 e e c . . . . . 
                . . f d d 2 2 2 f f f d d . . . 
                e e f d d e e e . f f d d . . . 
                e e e f f f f f . . . . . . . . 
                e e . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 2 2 2 e . . . 
                . . . . . . 2 2 2 2 d 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 e f f c c 
                . . . . . e e 2 2 e f f f f b c 
                . . . e e e f e 2 2 b f f f d c 
                . . e e 2 2 d f e 2 1 1 1 1 b c 
                . . e e 2 2 d f e e e c c c . . 
                . . b 1 1 d e 2 2 e e c . . . . 
                . . . f f f d d 2 2 f d d . . . 
                . . . . f f d d e e f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . e e e f f . . . . . . . 
                . . . . e e e e f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            WR2,
            [img`
                . . . . 2 2 2 2 2 e . . . . . . 
                . . . 2 2 2 2 d 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 e f f c c . . . 
                . . e e 2 2 e f f f f b c . . . 
                . e e e f e 2 b f f f d c . . . 
                e e 2 2 d f 2 1 1 1 1 b c . . . 
                e e 2 2 d f e e c c c . . . . . 
                b 1 1 d e 2 2 e e c . . . . . . 
                . f f e 2 2 2 2 e . . . . . . . 
                . . f f d d 2 2 f f d d . . . . 
                . . f f d d e e f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . e e e f f f . . . . . . . . 
                . . e e e e f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . e e e f e 2 2 b f f f d c . 
                . e e 2 2 d f e 2 1 1 1 1 b c . 
                . e e 2 2 d f e e e c c c . . . 
                . b 1 1 e e 2 2 e e c . . . . . 
                . . f d d 2 2 2 f f f d d . . . 
                e e f d d e e e . f f d d . . . 
                e e e f f f f f . . . . . . . . 
                e e . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 2 2 2 e . . . 
                . . . . . . 2 2 2 2 d 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 e f f c c 
                . . . . . e e 2 2 e f f f f b c 
                . . . e e e f e 2 2 b f f f d c 
                . . e e 2 2 d f e 2 1 1 1 1 b c 
                . . e e 2 2 d f e e e c c c . . 
                . . b 1 1 d e 2 2 e e c . . . . 
                . . . f f f d d 2 2 f d d . . . 
                . . . . f f d d e e f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . e e e f f . . . . . . . 
                . . . . e e e e f f . . . . . . 
                `],
            150,
            true
            )
            WR1.setVelocity(50, 0)
            WR2.setVelocity(50, 0)
            for (let index = 0; index < 5; index++) {
                OLine.x += 1
                pause(20)
                DLine.x += -1
            }
            pause(500)
            DB1.follow(WR1, randint(40, 60))
            DB2.follow(WR2, randint(40, 60))
            animation.runImageAnimation(
            DB1,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            DB2,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            DB3,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            DB4,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            pause(400)
            pause(500)
            pause(3000)
            DLine.follow(QB, 50)
        }
    }
})
forever(function () {
    if (playChosen == 4 && playStarted == 0) {
        if (playStarted == 0) {
            tiles.setCurrentTilemap(tilemap`level1`)
            QB = sprites.create(img`
                . . . . 2 2 2 2 2 e . . . . . . 
                . . . 2 2 2 2 d 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 e f f c c . . . 
                . . e e 2 2 e f f f f b c . . . 
                . e e e f e 2 b f f f d c . . . 
                e e 2 2 d f 2 e f f f b c . . . 
                e e 2 2 d f e c b 4 4 c . . . . 
                b 1 1 d e e c 4 1 1 4 c . . . . 
                . f f e e e e 4 4 4 4 c . . . . 
                . . f f d d e 4 4 4 b c . . . . 
                . . f f d d e c c c c d . . . . 
                . . . f f f f . . . . . . . . . 
                . . f f f e e e . . . . . . . . 
                . . f f f f e e e . . . . . . . 
                `, SpriteKind.Quarterback)
            QB.setPosition(LOS - 29, 120)
            HB = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 2 2 2 e . . . 
                . . . . . . 2 2 2 2 d 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 e f f c c 
                . . . . . e e 2 2 e f f f f b c 
                . . . e e e f e 2 2 b f f f d c 
                . . e e 2 2 d f e 2 1 1 1 1 b c 
                . . e e 2 2 d f e e e c c c . . 
                . . b 1 1 d e 2 2 e e c . . . . 
                . . . f f f d d 2 2 f d d . . . 
                . . . . f f d d e e f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . e e e f f . . . . . . . 
                . . . . e e e e f f . . . . . . 
                `, SpriteKind.Player)
            HB.setPosition(LOS - 35, 100)
            OLine = sprites.create(img`
                ................
                .......22222e...
                ......2222d22e..
                .....e2222222e..
                .....e2222222e..
                .....e22222effcc
                .....e222222efbc
                ...ee22222d22edc
                ..eee22222222ebc
                ..eee22222222e..
                ..b1e222222effcc
                ...fee222222efbc
                ..eee22222d22edc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffee222222efbc
                ..eee22222d22edc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffee222effffbc
                ..eeef222222efdc
                .ee2222222d22ebc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffee222effffbc
                ..eeef222222efdc
                .ee2222222d22ebc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffe222222effcc
                ...fee222222efbc
                ..eee22222d22edc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                .b11ee222effffbc
                ..eeefe222bfffdc
                .ee22dfee21111bc
                .ee22dfeeeeccc..
                .b11de222eec....
                ..fffdd222fdd...
                ...ffddeeefdd...
                ....ffffff......
                ...eeefff.......
                `, SpriteKind.Offense)
            OLine.setPosition(LOS, 120)
            WR1 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `, SpriteKind.Player)
            WR1.setPosition(LOS, 80)
            WR2 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `, SpriteKind.Player)
            WR2.setPosition(LOS, 160)
            scene.centerCameraAt(QB.x + 55, 120)
            DLine = sprites.create(img`
                ................
                ...866666.......
                ..866d6666......
                ..866666668.....
                ..866666668.....
                ccff8666668.....
                cbf86666668.....
                cd866d6666688...
                cb866666666888..
                ..866666666888..
                ccff866666681b..
                cbf866666688f...
                cd866d66666888..
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbf866666688ff..
                cd866d66666888..
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbffff866688ff..
                cdf8666666f888..
                cb866d666666688.
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbffff866688ff..
                cdf8666666f888..
                cb866d666666688.
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                ccff86666668ff..
                cbf866666688f...
                cd866d66666888..
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbffff86668811b.
                cdfffb6668f888..
                cb1111688fd6688.
                ..ccc8888fd6688.
                ....c886668d11b.
                ...ddf666ddfff..
                ...ddf888ddff...
                ......ffffff....
                .......fff888...
                `, SpriteKind.Line)
            DLine.setPosition(LOS + 25, 120)
            DB1 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB1.setPosition(LOS + 25, 80)
            DB2 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB2.setPosition(LOS + 25, 160)
            DB3 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB3.setPosition(LOS + 80, 135)
            DB4 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB4.setPosition(LOS + 80, 105)
            Football = sprites.create(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                `, SpriteKind.Pigskin)
            Football.setPosition(LOS, 130)
            pause(100)
            BallCaught = 1
            game.splash("Hut Hut, Hike!")
            playStarted = 1
            Football.setImage(img`
                . . f f f f . . 
                . f 4 4 4 4 f . 
                f 4 4 1 1 4 4 f 
                f e e 4 4 4 4 f 
                . f e e e e f . 
                . . f f f f . . 
                `)
        }
        if (playStarted == 1) {
            Football.follow(QB, 100)
            BallThrown = 0
            animation.runImageAnimation(
            WR1,
            [img`
                . . . . 2 2 2 2 2 e . . . . . . 
                . . . 2 2 2 2 d 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 e f f c c . . . 
                . . e e 2 2 e f f f f b c . . . 
                . e e e f e 2 b f f f d c . . . 
                e e 2 2 d f 2 1 1 1 1 b c . . . 
                e e 2 2 d f e e c c c . . . . . 
                b 1 1 d e 2 2 e e c . . . . . . 
                . f f e 2 2 2 2 e . . . . . . . 
                . . f f d d 2 2 f f d d . . . . 
                . . f f d d e e f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . e e e f f f . . . . . . . . 
                . . e e e e f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . e e e f e 2 2 b f f f d c . 
                . e e 2 2 d f e 2 1 1 1 1 b c . 
                . e e 2 2 d f e e e c c c . . . 
                . b 1 1 e e 2 2 e e c . . . . . 
                . . f d d 2 2 2 f f f d d . . . 
                e e f d d e e e . f f d d . . . 
                e e e f f f f f . . . . . . . . 
                e e . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 2 2 2 e . . . 
                . . . . . . 2 2 2 2 d 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 e f f c c 
                . . . . . e e 2 2 e f f f f b c 
                . . . e e e f e 2 2 b f f f d c 
                . . e e 2 2 d f e 2 1 1 1 1 b c 
                . . e e 2 2 d f e e e c c c . . 
                . . b 1 1 d e 2 2 e e c . . . . 
                . . . f f f d d 2 2 f d d . . . 
                . . . . f f d d e e f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . e e e f f . . . . . . . 
                . . . . e e e e f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            WR2,
            [img`
                . . . . 2 2 2 2 2 e . . . . . . 
                . . . 2 2 2 2 d 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 e f f c c . . . 
                . . e e 2 2 e f f f f b c . . . 
                . e e e f e 2 b f f f d c . . . 
                e e 2 2 d f 2 1 1 1 1 b c . . . 
                e e 2 2 d f e e c c c . . . . . 
                b 1 1 d e 2 2 e e c . . . . . . 
                . f f e 2 2 2 2 e . . . . . . . 
                . . f f d d 2 2 f f d d . . . . 
                . . f f d d e e f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . e e e f f f . . . . . . . . 
                . . e e e e f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . e e e f e 2 2 b f f f d c . 
                . e e 2 2 d f e 2 1 1 1 1 b c . 
                . e e 2 2 d f e e e c c c . . . 
                . b 1 1 e e 2 2 e e c . . . . . 
                . . f d d 2 2 2 f f f d d . . . 
                e e f d d e e e . f f d d . . . 
                e e e f f f f f . . . . . . . . 
                e e . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 2 2 2 e . . . 
                . . . . . . 2 2 2 2 d 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 e f f c c 
                . . . . . e e 2 2 e f f f f b c 
                . . . e e e f e 2 2 b f f f d c 
                . . e e 2 2 d f e 2 1 1 1 1 b c 
                . . e e 2 2 d f e e e c c c . . 
                . . b 1 1 d e 2 2 e e c . . . . 
                . . . f f f d d 2 2 f d d . . . 
                . . . . f f d d e e f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . e e e f f . . . . . . . 
                . . . . e e e e f f . . . . . . 
                `],
            150,
            true
            )
            WR1.setVelocity(50, 0)
            WR2.setVelocity(50, 0)
            for (let index = 0; index < 5; index++) {
                OLine.x += 1
                pause(20)
                DLine.x += -1
            }
            pause(500)
            DB1.follow(WR1, randint(40, 60))
            DB2.follow(WR2, randint(40, 60))
            animation.runImageAnimation(
            DB1,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            DB2,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            DB3,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            DB4,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            pause(400)
            WR1.setVelocity(20, 40)
            WR2.setVelocity(20, -40)
            pause(3500)
            DLine.follow(QB, 50)
        }
    }
})
forever(function () {
    if (playChosen == 2 && playStarted == 0) {
        if (playStarted == 0) {
            tiles.setCurrentTilemap(tilemap`level1`)
            QB = sprites.create(img`
                . . . . 2 2 2 2 2 e . . . . . . 
                . . . 2 2 2 2 d 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 e f f c c . . . 
                . . e e 2 2 e f f f f b c . . . 
                . e e e f e 2 b f f f d c . . . 
                e e 2 2 d f 2 e f f f b c . . . 
                e e 2 2 d f e c b 4 4 c . . . . 
                b 1 1 d e e c 4 1 1 4 c . . . . 
                . f f e e e e 4 4 4 4 c . . . . 
                . . f f d d e 4 4 4 b c . . . . 
                . . f f d d e c c c c d . . . . 
                . . . f f f f . . . . . . . . . 
                . . f f f e e e . . . . . . . . 
                . . f f f f e e e . . . . . . . 
                `, SpriteKind.Quarterback)
            QB.setPosition(LOS - 29, 120)
            HB = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 2 2 2 e . . . 
                . . . . . . 2 2 2 2 d 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 e f f c c 
                . . . . . e e 2 2 e f f f f b c 
                . . . e e e f e 2 2 b f f f d c 
                . . e e 2 2 d f e 2 1 1 1 1 b c 
                . . e e 2 2 d f e e e c c c . . 
                . . b 1 1 d e 2 2 e e c . . . . 
                . . . f f f d d 2 2 f d d . . . 
                . . . . f f d d e e f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . e e e f f . . . . . . . 
                . . . . e e e e f f . . . . . . 
                `, SpriteKind.Player)
            HB.setPosition(LOS - 35, 100)
            OLine = sprites.create(img`
                ................
                .......22222e...
                ......2222d22e..
                .....e2222222e..
                .....e2222222e..
                .....e22222effcc
                .....e222222efbc
                ...ee22222d22edc
                ..eee22222222ebc
                ..eee22222222e..
                ..b1e222222effcc
                ...fee222222efbc
                ..eee22222d22edc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffee222222efbc
                ..eee22222d22edc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffee222effffbc
                ..eeef222222efdc
                .ee2222222d22ebc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffee222effffbc
                ..eeef222222efdc
                .ee2222222d22ebc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                ..ffe222222effcc
                ...fee222222efbc
                ..eee22222d22edc
                .ee2e22222222ebc
                .ee2e22222222e..
                .b11e222222effcc
                .b11ee222effffbc
                ..eeefe222bfffdc
                .ee22dfee21111bc
                .ee22dfeeeeccc..
                .b11de222eec....
                ..fffdd222fdd...
                ...ffddeeefdd...
                ....ffffff......
                ...eeefff.......
                `, SpriteKind.Offense)
            OLine.setPosition(LOS, 120)
            WR1 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `, SpriteKind.Player)
            WR1.setPosition(LOS, 80)
            WR2 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `, SpriteKind.Player)
            WR2.setPosition(LOS, 160)
            scene.centerCameraAt(QB.x + 55, 120)
            DLine = sprites.create(img`
                ................
                ...866666.......
                ..866d6666......
                ..866666668.....
                ..866666668.....
                ccff8666668.....
                cbf86666668.....
                cd866d6666688...
                cb866666666888..
                ..866666666888..
                ccff866666681b..
                cbf866666688f...
                cd866d66666888..
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbf866666688ff..
                cd866d66666888..
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbffff866688ff..
                cdf8666666f888..
                cb866d666666688.
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbffff866688ff..
                cdf8666666f888..
                cb866d666666688.
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                ccff86666668ff..
                cbf866666688f...
                cd866d66666888..
                cb8666666668688.
                ..8666666668688.
                ccff8666666811b.
                cbffff86668811b.
                cdfffb6668f888..
                cb1111688fd6688.
                ..ccc8888fd6688.
                ....c886668d11b.
                ...ddf666ddfff..
                ...ddf888ddff...
                ......ffffff....
                .......fff888...
                `, SpriteKind.Line)
            DLine.setPosition(LOS + 25, 120)
            DB1 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB1.setPosition(LOS + 25, 80)
            DB2 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB2.setPosition(LOS + 25, 160)
            DB3 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB3.setPosition(LOS + 80, 135)
            DB4 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . 8 6 6 6 6 6 . . . . . . . 
                . . 8 6 6 d 6 6 6 6 . . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                c c f f 8 6 6 6 6 6 8 . . . . . 
                c b f f f f 8 6 6 8 8 . . . . . 
                c d f f f b 6 6 8 f 8 8 8 . . . 
                c b 1 1 1 1 6 8 f d 6 6 8 8 . . 
                . . c c c 8 8 8 f d 6 6 8 8 . . 
                . . . . c 8 8 6 6 8 d 1 1 b . . 
                . . . d d f 6 6 d d f f f . . . 
                . . . d d f 8 8 d d f f . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . . . . f f 8 8 8 . . . . 
                . . . . . . f f 8 8 8 8 . . . . 
                `, SpriteKind.Defense)
            DB4.setPosition(LOS + 80, 105)
            Football = sprites.create(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                `, SpriteKind.Pigskin)
            Football.setPosition(LOS, 130)
            pause(100)
            BallCaught = 1
            game.splash("Hut Hut, Hike!")
            playStarted = 1
            Football.setImage(img`
                . . f f f f . . 
                . f 4 4 4 4 f . 
                f 4 4 1 1 4 4 f 
                f e e 4 4 4 4 f 
                . f e e e e f . 
                . . f f f f . . 
                `)
        }
        if (playStarted == 1) {
            Football.follow(QB, 100)
            BallThrown = 0
            animation.runImageAnimation(
            WR1,
            [img`
                . . . . 2 2 2 2 2 e . . . . . . 
                . . . 2 2 2 2 d 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 e f f c c . . . 
                . . e e 2 2 e f f f f b c . . . 
                . e e e f e 2 b f f f d c . . . 
                e e 2 2 d f 2 1 1 1 1 b c . . . 
                e e 2 2 d f e e c c c . . . . . 
                b 1 1 d e 2 2 e e c . . . . . . 
                . f f e 2 2 2 2 e . . . . . . . 
                . . f f d d 2 2 f f d d . . . . 
                . . f f d d e e f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . e e e f f f . . . . . . . . 
                . . e e e e f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . e e e f e 2 2 b f f f d c . 
                . e e 2 2 d f e 2 1 1 1 1 b c . 
                . e e 2 2 d f e e e c c c . . . 
                . b 1 1 e e 2 2 e e c . . . . . 
                . . f d d 2 2 2 f f f d d . . . 
                e e f d d e e e . f f d d . . . 
                e e e f f f f f . . . . . . . . 
                e e . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 2 2 2 e . . . 
                . . . . . . 2 2 2 2 d 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 e f f c c 
                . . . . . e e 2 2 e f f f f b c 
                . . . e e e f e 2 2 b f f f d c 
                . . e e 2 2 d f e 2 1 1 1 1 b c 
                . . e e 2 2 d f e e e c c c . . 
                . . b 1 1 d e 2 2 e e c . . . . 
                . . . f f f d d 2 2 f d d . . . 
                . . . . f f d d e e f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . e e e f f . . . . . . . 
                . . . . e e e e f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            WR2,
            [img`
                . . . . 2 2 2 2 2 e . . . . . . 
                . . . 2 2 2 2 d 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 e f f c c . . . 
                . . e e 2 2 e f f f f b c . . . 
                . e e e f e 2 b f f f d c . . . 
                e e 2 2 d f 2 1 1 1 1 b c . . . 
                e e 2 2 d f e e c c c . . . . . 
                b 1 1 d e 2 2 e e c . . . . . . 
                . f f e 2 2 2 2 e . . . . . . . 
                . . f f d d 2 2 f f d d . . . . 
                . . f f d d e e f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . e e e f f f . . . . . . . . 
                . . e e e e f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e 2 b f f f d c . 
                . . e e 2 2 d f 2 1 1 1 1 b c . 
                . . e e 2 2 d f e e c c c . . . 
                . . b 1 1 d e 2 e e c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f e . . . . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . e e e f e 2 2 b f f f d c . 
                . e e 2 2 d f e 2 1 1 1 1 b c . 
                . e e 2 2 d f e e e c c c . . . 
                . b 1 1 e e 2 2 e e c . . . . . 
                . . f d d 2 2 2 f f f d d . . . 
                e e f d d e e e . f f d d . . . 
                e e e f f f f f . . . . . . . . 
                e e . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 2 2 2 e . . . 
                . . . . . . 2 2 2 2 d 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 e f f c c 
                . . . . . e e 2 2 e f f f f b c 
                . . . e e e f e 2 2 b f f f d c 
                . . e e 2 2 d f e 2 1 1 1 1 b c 
                . . e e 2 2 d f e e e c c c . . 
                . . b 1 1 d e 2 2 e e c . . . . 
                . . . f f f d d 2 2 f d d . . . 
                . . . . f f d d e e f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . e e e f f . . . . . . . 
                . . . . e e e e f f . . . . . . 
                `],
            150,
            true
            )
            WR1.setVelocity(50, 0)
            WR2.setVelocity(50, 0)
            for (let index = 0; index < 5; index++) {
                OLine.x += 1
                pause(20)
                DLine.x += -1
            }
            pause(500)
            DB1.follow(WR1, randint(40, 60))
            DB2.follow(WR2, randint(40, 60))
            animation.runImageAnimation(
            DB1,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            DB2,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            DB3,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            animation.runImageAnimation(
            DB4,
            [img`
                . . . . 6 6 6 6 6 8 . . . . . . 
                . . . 6 6 6 6 d 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 6 6 8 . . . . . 
                . . 8 6 6 6 6 6 8 f f c c . . . 
                . . 8 8 6 6 8 f f f f b c . . . 
                . 8 8 8 f 8 6 b f f f d c . . . 
                8 8 6 6 d f 6 1 1 1 1 b c . . . 
                8 8 6 6 d f 8 8 c c c . . . . . 
                b 1 1 d 8 6 6 8 8 c . . . . . . 
                . f f 8 6 6 6 6 8 . . . . . . . 
                . . f f d d 6 6 f f d d . . . . 
                . . f f d d 8 8 f f d d . . . . 
                . . . f f f f . . . . . . . . . 
                . . 8 8 8 f f f . . . . . . . . 
                . . 8 8 8 8 f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . . 8 8 8 f 8 6 b f f f d c . 
                . . 8 8 6 6 d f 6 1 1 1 1 b c . 
                . . 8 8 6 6 d f 8 8 c c c . . . 
                . . b 1 1 d 8 6 8 8 c . . . . . 
                . . f f f f d d f . . . . . . . 
                f f f f f f d d . . . . . . . . 
                f f f . f f f 8 . . . . . . . . 
                f f . . . . 8 8 8 . . . . . . . 
                . . . . . . 8 8 8 8 . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 6 8 . . . . 
                . . . . . 6 6 6 6 d 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 6 6 8 . . . 
                . . . . 8 6 6 6 6 6 8 f f c c . 
                . . . . 8 8 6 6 8 f f f f b c . 
                . . 8 8 8 f 8 6 6 b f f f d c . 
                . 8 8 6 6 d f 8 6 1 1 1 1 b c . 
                . 8 8 6 6 d f 8 8 8 c c c . . . 
                . b 1 1 8 8 6 6 8 8 c . . . . . 
                . . f d d 6 6 6 f f f d d . . . 
                8 8 f d d 8 8 8 . f f d d . . . 
                8 8 8 f f f f f . . . . . . . . 
                8 8 . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 6 6 6 6 6 8 . . . 
                . . . . . . 6 6 6 6 d 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 6 6 8 . . 
                . . . . . 8 6 6 6 6 6 8 f f c c 
                . . . . . 8 8 6 6 8 f f f f b c 
                . . . 8 8 8 f 8 6 6 b f f f d c 
                . . 8 8 6 6 d f 8 6 1 1 1 1 b c 
                . . 8 8 6 6 d f 8 8 8 c c c . . 
                . . b 1 1 d 8 6 6 8 8 c . . . . 
                . . . f f f d d 6 6 f d d . . . 
                . . . . f f d d 8 8 f d d . . . 
                . . . . . f f f f f . . . . . . 
                . . . . 8 8 8 f f . . . . . . . 
                . . . . 8 8 8 8 f f . . . . . . 
                `],
            150,
            true
            )
            pause(400)
            WR2.setVelocity(0, -50)
            pause(500)
            WR1.setVelocity(40, 20)
            pause(3000)
            DLine.follow(QB, 50)
        }
    }
})
forever(function () {
    if (BallThrown == 0 && playStarted == 1 && (controller.up.isPressed() || controller.down.isPressed() || (controller.left.isPressed() || controller.right.isPressed()))) {
        scene.cameraFollowSprite(QB)
        Football.follow(QB, 52)
        if (QBRunning == 0) {
            animation.runImageAnimation(
            QB,
            [img`
                . . . . 2 2 2 2 2 e . . . . . . 
                . . . 2 2 2 2 d 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 2 2 e . . . . . 
                . . e 2 2 2 2 2 e f f c c . . . 
                . . e e 2 2 e f f f f b c . . . 
                . e e e f e 2 b f f f d c . . . 
                e e 2 2 d f 2 e f f f b c . . . 
                e e 2 2 d f e c b 4 4 c . . . . 
                b 1 1 d e e c 4 1 1 4 c . . . . 
                . f f e e e e 4 4 4 4 c . . . . 
                . . f f d d e 4 4 4 b c . . . . 
                . . f f d d e c c c c d . . . . 
                . . . f f f f . . . . . . . . . 
                . . f f f e e e . . . . . . . . 
                . . f f f f e e e . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . . e e e f e e f f f f d c . 
                . . e e 2 2 d f c b 4 4 c b c . 
                . . e e 2 2 b c 4 1 1 4 c . . . 
                . . b 1 1 b e c 4 4 4 4 c . . . 
                . . f f f f d d 4 4 4 b c . . . 
                f f f f f f d d c c c c . . . . 
                f f f . f f f f c c c . . . . . 
                f f . . . . e e e . . . . . . . 
                . . . . . . e e e e . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 e . . . . 
                . . . . . 2 2 2 2 d 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 2 2 e . . . 
                . . . . e 2 2 2 2 2 e f f c c . 
                . . . . e e 2 2 e f f f f b c . 
                . . e e e f e e f f f f f d c . 
                . e e 2 2 d f c b 4 4 c 1 b c . 
                . e e 2 2 b c 4 1 1 4 c c . . . 
                . b 1 1 b e c 4 4 4 4 c . . . . 
                . . f f f d d 4 4 4 b c d . . . 
                e e f f f d d c c c c d d . . . 
                e e e f f f f c c c . . . . . . 
                e e . . . . f f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 2 2 2 e . . . 
                . . . . . . 2 2 2 2 d 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 2 2 e . . 
                . . . . . e 2 2 2 2 2 e f f c c 
                . . . . . e e 2 2 e f f f f b c 
                . . . e e e f e 2 2 e f f f d c 
                . . e e 2 2 d f e 2 c b 4 4 c c 
                . . e e 2 2 d f e c 4 1 1 4 c . 
                . . b 1 1 d e e e c 4 4 4 4 c . 
                . . . f f f f f d d 4 4 4 b c . 
                . . . . f f f f d d c c c c . . 
                . . . . . f f f f f c c c . . . 
                . . . . e e e f f . . . . . . . 
                . . . . e e e e f f . . . . . . 
                `],
            150,
            true
            )
            QBRunning = 1
        }
        controller.moveSprite(QB, 50, 50)
    }
})
forever(function () {
    if (playStarted == 1 && QB.x >= LOS && BallThrown == 0) {
        BallCaught = 1
        DB1.follow(QB, randint(40, 60))
        DB2.follow(QB, randint(40, 60))
        DB3.follow(QB, randint(40, 60))
        DB4.follow(QB, randint(40, 60))
        DLine.follow(QB, randint(40, 60))
    }
})
