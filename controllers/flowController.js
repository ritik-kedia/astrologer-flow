const Astrologer = require('../models/astrologer');
const User = require('../models/user');

exports.assignUser = async (req, res) => {
    try {
        const user = new User({ name: req.body.name });
        const astrologers = await Astrologer.find().sort({ currentLoad: 1 });

        let selectedAstrologer = astrologers[0];

        for (let astrologer of astrologers) {
            if (astrologer.currentLoad < selectedAstrologer.currentLoad ||
                (astrologer.currentLoad === selectedAstrologer.currentLoad && astrologer.isTopAstrologer)) {
                selectedAstrologer = astrologer;
            }
        }

        selectedAstrologer.currentLoad += 1;
        await selectedAstrologer.save();

        user.assignedAstrologer = selectedAstrologer._id;
        await user.save();

        res.json({
            message: `User ${user.name} assigned to ${selectedAstrologer.name}`,
            assignedAstrologer: selectedAstrologer.name
        });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning user', error });
    }
};

exports.adjustFlow = async (req, res) => {
    try {
        const { increaseFlow } = req.body;
        const topAstrologers = await Astrologer.find({ isTopAstrologer: true });

        for (let astrologer of topAstrologers) {
            astrologer.currentLoad += increaseFlow ? -1 : 1;
            await astrologer.save();
        }

        res.json({ message: 'Flow adjusted for top astrologers' });
    } catch (error) {
        res.status(500).json({ message: 'Error adjusting flow', error });
    }
};
