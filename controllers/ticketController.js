const Ticket = require('../models/Ticket');

const PER_PAGE = 10;

const renderError = (req, res, message) => {
    return res.status(404).render('error', {
        message,
        activeMenu: 'tickets',
        userId: req.session.userId,
        userName: req.session.name,
        sidebarCollapsed: req.session.sidebarCollapsed ? req.session.sidebarCollapsed : false,
    });
};

exports.ticketsIndex = async (req, res) => {
    try {
        const requestedPage = parseInt(req.query.page, 10);
        const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

        const total = await Ticket.countDocuments();
        const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
        const page = Math.min(currentPage, totalPages);
        const skip = (page - 1) * PER_PAGE;

        const tickets = await Ticket.find()
            .sort({ isRead: 1, createdAt: -1 })
            .skip(skip)
            .limit(PER_PAGE)
            .lean();

        const unreadTotal = await Ticket.countDocuments({ isRead: { $ne: true } });

        res.render('tickets', {
            tickets,
            currentPage: page,
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            unreadTotal,
            activeMenu: 'tickets',
            userId: req.session.userId,
            userName: req.session.name,
            sidebarCollapsed: req.session.sidebarCollapsed ? req.session.sidebarCollapsed : false,
        });
    } catch (error) {
        console.error('Error loading tickets:', error);
        return res.status(500).render('error', {
            message: 'Failed to load tickets',
            activeMenu: 'tickets',
            userId: req.session.userId,
            userName: req.session.name,
            sidebarCollapsed: req.session.sidebarCollapsed ? req.session.sidebarCollapsed : false,
        });
    }
};

exports.markAllRead = async (req, res) => {
    try {
        await Ticket.updateMany({ isRead: { $ne: true } }, { isRead: true, readAt: new Date() });
        return res.json({ success: true });
    } catch (error) {
        console.error('Error marking all tickets read:', error);
        return res.status(500).json({ error: 'Failed to mark all as read' });
    }
};

exports.ticketView = async (req, res) => {
    try {
        const { id } = req.params;
        let ticket = await Ticket.findById(id).lean();

        if (!ticket) {
            return renderError(req, res, 'Ticket not found');
        }

        if (!ticket.isRead) {
            await Ticket.findByIdAndUpdate(id, { isRead: true, readAt: new Date() });
            ticket.isRead = true;
            ticket.readAt = new Date();
        }

        return res.render('ticket-view', {
            ticket,
            activeMenu: 'tickets',
            userId: req.session.userId,
            userName: req.session.name,
            sidebarCollapsed: req.session.sidebarCollapsed ? req.session.sidebarCollapsed : false,
        });
    } catch (error) {
        console.error('Error loading ticket view:', error);
        return res.status(500).render('error', {
            message: 'Failed to load ticket',
            activeMenu: 'tickets',
            userId: req.session.userId,
            userName: req.session.name,
            sidebarCollapsed: req.session.sidebarCollapsed ? req.session.sidebarCollapsed : false,
        });
    }
};

exports.markTicketRead = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findByIdAndUpdate(
            id,
            { isRead: true, readAt: new Date() },
            { new: true }
        ).lean();

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        return res.json({ message: 'Ticket marked as read' });
    } catch (error) {
        console.error('Error marking ticket as read:', error);
        return res.status(500).json({ error: 'Failed to update ticket' });
    }
};

exports.markTicketUnread = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findByIdAndUpdate(
            id,
            { isRead: false, readAt: null },
            { new: true }
        ).lean();

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        return res.json({ message: 'Ticket marked as unread' });
    } catch (error) {
        console.error('Error marking ticket as unread:', error);
        return res.status(500).json({ error: 'Failed to update ticket' });
    }
};
