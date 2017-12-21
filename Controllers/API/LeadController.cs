using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using System.Linq;

namespace TodoApi.Controllers
{
    [Route("api/leads")]
    public class LeadController : Controller
    {
        private readonly TodoContext _context;

        public LeadController(TodoContext context)
        {
            _context = context;

            if (_context.Leads.Count() == 0)
            {
                _context.Leads.Add(new Lead { Name = "Lead1", CompanyName = "Hawksoft!" });
                _context.SaveChanges();
            }
        }       

        [HttpGet]
        public IEnumerable<Lead> GetAll()
        {
            return _context.Leads.ToList();
        }

        // [HttpGet("{id}", Name = "GetTodo")]
        // public IActionResult GetById(long id)
        // {
        //     var item = _context.TodoItems.FirstOrDefault(t => t.Id == id);
        //     if (item == null)
        //     {
        //         return NotFound();
        //     }
        //     return new ObjectResult(item);
        // }

        // [HttpPost]
        // public IActionResult Create([FromBody] TodoItem item)
        // {
        //     if (item == null)
        //     {
        //         return BadRequest();
        //     }

        //     _context.TodoItems.Add(item);
        //     _context.SaveChanges();

        //     return CreatedAtRoute("GetTodo", new { id = item.Id }, item);
        // }

        // [HttpPut("{id}")]
        // public IActionResult Update(long id, [FromBody] TodoItem item)
        // {
        //     if (item == null || item.Id != id)
        //     {
        //         return BadRequest();
        //     }

        //     var todo = _context.TodoItems.FirstOrDefault(t => t.Id == id);
        //     if (todo == null)
        //     {
        //         return NotFound();
        //     }

        //     todo.IsComplete = item.IsComplete;
        //     todo.Name = item.Name;

        //     _context.TodoItems.Update(todo);
        //     _context.SaveChanges();
        //     return new NoContentResult();
        // }

        // [HttpDelete("{id}")]
        // public IActionResult Delete(long id)
        // {
        //     var todo = _context.TodoItems.FirstOrDefault(t => t.Id == id);
        //     if (todo == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.TodoItems.Remove(todo);
        //     _context.SaveChanges();
        //     return new NoContentResult();
        // }
    }
}