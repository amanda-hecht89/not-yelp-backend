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

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from restuarants WHERE id = $1
      `, [id]
    ); if (rows.length === 0) {
      return null;
    } return new Restuarant(rows[0]);
  }

  async getRestReviews() {
    const { rows } = await pool.query(
      `
      SELECT reviews.* from reviews
      WHERE reviews.restuarant_id = $1
      `, [this.id]
    );
    return rows;
  }
  static async insert({ stars, details }) {
    const { rows } = await pool.query(
      `
    INSERT INTO restuarants (stars, details)
    VALUES ($1, $2)
    RETURNING *
    `, [stars, details]
    ); return new Restuarant(rows[0]);
  }

};
