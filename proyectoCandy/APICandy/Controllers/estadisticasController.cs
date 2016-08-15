using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using APICandy.Models;

namespace APICandy.Controllers
{
    public class estadisticasController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/estadisticas
        public IQueryable<estadisticas> Getestadisticas()
        {
            return db.estadisticas;
        }

        // GET: api/estadisticas/5
        [ResponseType(typeof(estadisticas))]
        public IHttpActionResult Getestadisticas(decimal id)
        {
            estadisticas estadisticas = db.estadisticas.Find(id);
            if (estadisticas == null)
            {
                return NotFound();
            }

            return Ok(estadisticas);
        }

        // PUT: api/estadisticas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putestadisticas(decimal id, estadisticas estadisticas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != estadisticas.id_estadistíca)
            {
                return BadRequest();
            }

            db.Entry(estadisticas).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!estadisticasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/estadisticas
        [ResponseType(typeof(estadisticas))]
        public IHttpActionResult Postestadisticas(estadisticas estadisticas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.estadisticas.Add(estadisticas);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = estadisticas.id_estadistíca }, estadisticas);
        }

        // DELETE: api/estadisticas/5
        [ResponseType(typeof(estadisticas))]
        public IHttpActionResult Deleteestadisticas(decimal id)
        {
            estadisticas estadisticas = db.estadisticas.Find(id);
            if (estadisticas == null)
            {
                return NotFound();
            }

            db.estadisticas.Remove(estadisticas);
            db.SaveChanges();

            return Ok(estadisticas);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool estadisticasExists(decimal id)
        {
            return db.estadisticas.Count(e => e.id_estadistíca == id) > 0;
        }
    }
}