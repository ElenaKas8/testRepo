//Задача. Вывести среднюю оценку на треки юзеров не из Germany

db.reactions.aggregate([
    {
        $lookup: {
            from: 'users',
            localField: 'author_id',
            foreignField: '_id',
            as: 'author'
        }
    },
    { $unwind: '$author' },
    { $match: { 'author.country': { $ne: 'Germany' } } },
    { $group: { _id: null, avgValue: { $avg: '$value' } } }
])