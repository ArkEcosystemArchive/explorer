module.exports = () => {
    const [version, date] = require('child_process').execSync('git log -1 --format="%h %ad" --date=short').toString().split(' ')

    return {version, date}
}