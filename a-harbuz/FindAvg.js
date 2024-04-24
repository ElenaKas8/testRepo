db.reactions.aggregate ([
    {
        $lookup: {
            from: 'tracks',
            localField: 'track_id',
            foreignField: '_id',
            as: 'track'
        }
    },

    {
        $lookup: {
            from: 'users',
            localField: 'author_id',
            foreignField: '_id',
            as: 'author'
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
