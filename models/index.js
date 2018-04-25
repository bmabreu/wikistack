const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});


const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },

    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    status: {
        type: Sequelize.ENUM('open', 'closed'),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },


}, {
    getterMethods: {
        route() {
            return '/wiki/' + this.urlTitle;
        }
    }
});


Page.addHook('beforeValidate', (page) => {
    page.urlTitle = urlConvert(page.title);
});


const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    }
})

function urlConvert(title) {
    const spaces = / /gi;
    const newUrl = title.replace(spaces, '_');
    if (title) return newUrl;
    else return Math.random().toString(36).substring(2, 7);
}

module.exports = {
    Page: Page,
    User: User,
    db: db
}