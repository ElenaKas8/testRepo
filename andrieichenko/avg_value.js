db.reactions.aggregate([
    {
        $lookup: {
            from: 'tracks',
            localField: 'track_id',
            foreignField: '_id',
            as: 'track'
        }
    },
    { $unwind: '$track' },
    {
        $lookup: {
            from: 'users',
            localField: 'track.author_id',
            foreignField: '_id',
            as: 'track_author'
        }
    },
    { $unwind: '$track_author' },
    { $match: { 'track_author.country': { $ne: 'Germany' } } },
    {
        $group: {
            _id: null,
            avg_value: { $avg: '$value' }
        }
    }
])