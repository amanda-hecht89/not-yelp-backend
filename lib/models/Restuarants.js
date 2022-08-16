const pool = require('../utils/pool');

module.exports = class Restuarant {
  id;
  name;
  style;
  stars;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.style = row.style;
    this.stars = row.stars;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT * FROM restuarants
        `
    ); return rows.map((row) => new Restuarant(row));
  }
};
