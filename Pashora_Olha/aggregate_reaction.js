//Вывести среднюю оценку на треки, у которых авторы не из Germany
db.reactions.aggregate([
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
            localField: 'track.author_id',
            foreignField: '_id',
            as: 'author'
        }
    },
    {$unwind: '$track'},
    {$unwind: '$author'},
    {$match: {'author.country': {$ne: 'Germany'}}},
    {
        $group: {
            _id: null,
            avg_reaction: {$avg: '$value'}
        }
    }
])