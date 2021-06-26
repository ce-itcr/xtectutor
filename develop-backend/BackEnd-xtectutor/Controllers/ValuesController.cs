using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using System.Web.Http.Cors;
using System.Diagnostics;
using Newtonsoft.Json.Linq;
using System.Data;

namespace BackEnd_xtectutor.Controllers
{
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
    public class ValuesController : ApiController
    {

        static string stringconnection = @"Server=localhost\\MSSQLSERVER04;Database=master;Trusted_Connection=True;";
        SqlConnection conn = new SqlConnection(stringconnection);

        [HttpGet]
        [Route("api/admin/courses")]
        public JArray obtainCourses()
        {
            conn.Open();
            SqlCommand getRequest = conn.CreateCommand();
            getRequest.CommandText = "EXEC sp_GetCourse";
            getRequest.ExecuteNonQuery();
            SqlDataReader data = getRequest.ExecuteReader();
            JArray obj = new JArray();
            while (data.Read())
            {
                JObject courseInfo = new JObject(
                new JProperty("id", data.GetValue(0).ToString()),
                new JProperty("name", data.GetValue(1).ToString()),
                new JProperty("credits", data.GetValue(2).ToString()),
                new JProperty("career", data.GetValue(3).ToString()),
                new JProperty("available", data.GetValue(4).ToString())
                );
                obj.Add(courseInfo);
            }
            data.Close();
            conn.Close();
            return obj;

        }

        [HttpPost]
        [Route("api/admin/careers/add")]
        public IHttpActionResult addCareer([FromBody] JObject careerInfo)
        {

            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "INSERT INTO CAREER VALUES ('Ingeniería en Mecatrónica')";
                //insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = courseInfo["id"];
                //insertRequest.Parameters.Add("@CName", SqlDbType.VarChar, 50).Value = courseInfo["name"];
                //insertRequest.Parameters.Add("@Credits", SqlDbType.Int).Value = (int)courseInfo["credits"];
                //insertRequest.Parameters.Add("@Career", SqlDbType.VarChar, 50).Value = courseInfo["career"];
                insertRequest.ExecuteNonQuery();
                conn.Close();
                return Ok("Carrera agregada");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
