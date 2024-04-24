db.reactions.aggregate ([
    {
        $lookup: {
            from: 'tracks', // название коллекции(добавляемой!)
            localField: 'track_id', // внеш/ключ в тек/коллекции
            foreignField: '_id', // перв/ключ в связанной коллекции
            as: 'track' // куда поместить данные
        }
    },

    {
        $lookup: {
            from: 'users', // название коллекции(добавляемой!)
            localField: 'author_id', // внеш/ключ в тек/коллекции
            foreignField: '_id', // перв/ключ в связанной коллекции
            as: 'author' // куда поместить данные
        }
    },
    {$unwind: '$track'},
    {$unwind: '$author'},
    {$match: {author:{$ne:'Germany'}}},
    {
        $group: {
            _id: null,
            avg_value: {$avg: '$value'}
        }
    }
])
