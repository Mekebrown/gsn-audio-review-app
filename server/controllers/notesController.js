exports.notesController = (req, res) => {
    res.json({
        notesList: ["note 1", "note 2", "this", "works?"]
    });
}