module.exports = function (res) {
    return {
        created: resource => res.status(201).json(resource),
        updated: info => res.status(204).json(info),
        deleted: () => res.status(204).json(),
        ok: resource => res.status(200).json(resource),
        asyncCreated: delayedData => res.status(204).json(delayedData),
        asyncDeleted: delayedData => res.status(204).json(delayedData),

        serverError: function(err) { res.status(500).json(err); throw err; },
        validationError: err => res.status(400).json(err),
    }
};
