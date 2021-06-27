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

namespace WebApplication1.Controllers
{
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
    public class ValuesController : ApiController
    {
        static string stringconnection = @"Data Source=DESKTOP-RCFSH5R\MSSQLSERVER06;Initial Catalog=xtectutor;Integrated Security=True";
     //   static string stringconnection = @"Data Source=MELI\\SQLEXPRESS;Initial Catalog=xtectutor;Integrated Security=True";
     //   static string stringconnection = @"Data Source=DESKTOP-FOUQTL8\SQLEXPRESS;Initial Catalog=xtectutor;Integrated Security=True";
        SqlConnection conn = new SqlConnection(stringconnection);

        [HttpPost]
        [Route("api/admin/careers/add")]
        public IHttpActionResult addCareer([FromBody] JObject careerInfo)
        {

            try
            {
                Debug.Print("10");
                conn.Open();
                Debug.Print("1");
                SqlCommand insertRequest = conn.CreateCommand();
                Debug.Print("2");
                insertRequest.CommandText = "INSERT INTO CAREER VALUES ('Ingeniería en Alimentos')";
                //insertRequest.Parameters.Add("@CID", SqlDbType.VarChar, 50).Value = courseInfo["id"];
                //insertRequest.Parameters.Add("@CName", SqlDbType.VarChar, 50).Value = courseInfo["name"];
                //insertRequest.Parameters.Add("@Credits", SqlDbType.Int).Value = (int)courseInfo["credits"];
                //insertRequest.Parameters.Add("@Career", SqlDbType.VarChar, 50).Value = courseInfo["career"];
                Debug.Print("3");
                insertRequest.ExecuteNonQuery();
                Debug.Print("4");
                conn.Close();
                return Ok("Carrera agregada");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }
    }
}