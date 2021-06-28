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

namespace xtectutor_backend.Controllers
{
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]

    public class AdminController : ApiController
    {
        //static string stringconnection = @"Data Source=DESKTOP-RCFSH5R\MSSQLSERVER05;Initial Catalog=xtectutor;Integrated Security=True";
        //static string stringconnection = @"Data Source=MELI\SQLEXPRESS;Initial Catalog=xtectutor;Integrated Security=True";
        //static string stringconnection = @"Data Source=DESKTOP-MT7NP0P;Initial Catalog=xtectutor;Integrated Security=True";
        static string stringconnection = @"Data Source=DESKTOP-FOUQTL8\SQLEXPRESS;Initial Catalog=xtectutor;Integrated Security=True";
        SqlConnection conn = new SqlConnection(stringconnection);

        [HttpPost]
        [Route("api/admin/get/info")]
        public JArray getAdminInfo([FromBody] JObject AdminInfo)
        {

            conn.Open();
            SqlCommand selectRequest = conn.CreateCommand();
            selectRequest.CommandText = "EXEC sp_GetAdminInfo @Username";
            selectRequest.Parameters.Add("@Username", SqlDbType.VarChar, 10).Value = AdminInfo["username"];

            selectRequest.ExecuteNonQuery();

            SqlDataReader data = selectRequest.ExecuteReader();
            JArray obj = new JArray();

            while (data.Read())
            {
                JObject adminUserInfo = new JObject(
                new JProperty("username", data.GetValue(0).ToString()),
                new JProperty("password", data.GetValue(1).ToString()),
                new JProperty("adminName", data.GetValue(2).ToString()),
                new JProperty("mail", data.GetValue(3).ToString()),
                new JProperty("campus", data.GetValue(4).ToString())
                );
                obj.Add(adminUserInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }

        [HttpGet]
        [Route("api/admin/get/all/admins")]
        public JArray getAllAdmins()
        {

            conn.Open();
            SqlCommand selectRequest = conn.CreateCommand();
            selectRequest.CommandText = "EXEC sp_GetAllAdminInfo";

            selectRequest.ExecuteNonQuery();

            SqlDataReader data = selectRequest.ExecuteReader();
            JArray obj = new JArray();

            while (data.Read())
            {
                JObject adminUserInfo = new JObject(
                new JProperty("username", data.GetValue(0).ToString()),
                new JProperty("password", data.GetValue(1).ToString()),
                new JProperty("adminName", data.GetValue(2).ToString()),
                new JProperty("mail", data.GetValue(3).ToString()),
                new JProperty("campus", data.GetValue(4).ToString())
                );
                obj.Add(adminUserInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }

        [HttpGet]
        [Route("api/admin/get/all/careers")]
        public JArray getAllCareers()
        {

            conn.Open();
            SqlCommand selectRequest = conn.CreateCommand();
            selectRequest.CommandText = "EXEC sp_GetAllCareers";

            selectRequest.ExecuteNonQuery();

            SqlDataReader data = selectRequest.ExecuteReader();
            JArray obj = new JArray();

            while (data.Read())
            {
                JObject adminUserInfo = new JObject(
                new JProperty("careerName", data.GetValue(0).ToString())
                );
                obj.Add(adminUserInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }

        [HttpGet]
        [Route("api/admin/get/all/courses")]
        public JArray getAllCourses()
        {

            conn.Open();
            SqlCommand selectRequest = conn.CreateCommand();
            selectRequest.CommandText = "EXEC sp_GetAllCourses";

            selectRequest.ExecuteNonQuery();

            SqlDataReader data = selectRequest.ExecuteReader();
            JArray obj = new JArray();

            while (data.Read())
            {
                JObject adminUserInfo = new JObject(
                new JProperty("code", data.GetValue(0).ToString()),
                new JProperty("name", data.GetValue(1).ToString()),
                new JProperty("associatedCareer", data.GetValue(2).ToString())
                );
                obj.Add(adminUserInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }

        [HttpGet]
        [Route("api/admin/get/all/subjects")]
        public JArray getAllSubjects()
        {

            conn.Open();
            SqlCommand selectRequest = conn.CreateCommand();
            selectRequest.CommandText = "EXEC sp_GetAllSubjects";

            selectRequest.ExecuteNonQuery();

            SqlDataReader data = selectRequest.ExecuteReader();
            JArray obj = new JArray();

            while (data.Read())
            {
                JObject adminUserInfo = new JObject(
                new JProperty("subjectName", data.GetValue(0).ToString()),
                new JProperty("associatedCourse", data.GetValue(1).ToString())
                );
                obj.Add(adminUserInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }

        [HttpPost]
        [Route("api/user/add/career")]
        public IHttpActionResult AddCareer([FromBody] JObject CareerInfo)
        {
            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddCareer @CareerName";
                insertRequest.Parameters.Add("@CareerName", SqlDbType.VarChar, 50).Value = CareerInfo["careerName"];
                insertRequest.ExecuteNonQuery();
                conn.Close();

                return Ok("Agregado");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        [HttpPost]
        [Route("api/user/add/course")]
        public IHttpActionResult AddCourse([FromBody] JObject CourseInfo)
        {
            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddCourse @CourseCode, @CourseName, @CareerName";
                insertRequest.Parameters.Add("@CourseCode", SqlDbType.VarChar, 50).Value = CourseInfo["code"];
                insertRequest.Parameters.Add("@CourseName", SqlDbType.VarChar, 50).Value = CourseInfo["name"];
                insertRequest.Parameters.Add("@CareerName", SqlDbType.VarChar, 50).Value = CourseInfo["associatedCareer"];
                insertRequest.ExecuteNonQuery();
                conn.Close();

                return Ok("Agregado");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        [HttpPost]
        [Route("api/user/add/subject")]
        public IHttpActionResult AddSubject([FromBody] JObject SubjectInfo)
        {
            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddSubject @SubjectName, @CourseCode";
                insertRequest.Parameters.Add("@SubjectName", SqlDbType.VarChar, 50).Value = SubjectInfo["subjectName"];
                insertRequest.Parameters.Add("@CourseCode", SqlDbType.VarChar, 50).Value = SubjectInfo["associatedCourse"];
                insertRequest.ExecuteNonQuery();
                conn.Close();

                return Ok("Agregado");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        [HttpPost]
        [Route("api/user/delete/career")]
        public IHttpActionResult DeleteCareer([FromBody] JObject CareerInfo)
        {
            try
            {
                conn.Open();
                SqlCommand selectRequest = conn.CreateCommand();
                selectRequest.CommandText = "EXEC sp_getCoursesFromCareer @CareerName";
                selectRequest.Parameters.Add("@CareerName", SqlDbType.VarChar, 50).Value = CareerInfo["careerName"];
                selectRequest.ExecuteNonQuery();


                SqlDataReader data = selectRequest.ExecuteReader();
                List<string> courseList = new List<string>();
                while (data.Read())
                {
                    courseList.Add(data.GetValue(0).ToString());
                }
                data.Close();
                conn.Close();

                foreach(var item in courseList)
                {
                    conn.Open();
                    SqlCommand deleteRequest = conn.CreateCommand();
                    deleteRequest.CommandText = "EXEC sp_deleteSubjectFromCourse @CourseCode";
                    deleteRequest.Parameters.Add("@CourseCode", SqlDbType.VarChar, 50).Value = item;
                    deleteRequest.ExecuteNonQuery();

                    conn.Close();

                }

                conn.Open();
                SqlCommand deleteRequestCareer = conn.CreateCommand();
                deleteRequestCareer.CommandText = "EXEC sp_deleteCareer @CareerName";
                deleteRequestCareer.Parameters.Add("@CareerName", SqlDbType.VarChar, 50).Value = CareerInfo["careerName"];
                deleteRequestCareer.ExecuteNonQuery();

                conn.Close();

                return Ok("Eliminado");
            }
            catch
            {
                return BadRequest("Error al eliminar");
            }
        }

        [HttpPost]
        [Route("api/user/delete/course")]
        public IHttpActionResult DeleteCourse([FromBody] JObject CourseInfo)
        {
            try
            {
                conn.Open();
                SqlCommand deleteRequest = conn.CreateCommand();
                deleteRequest.CommandText = "EXEC sp_deleteSubjectFromCourse @CourseCode";
                deleteRequest.Parameters.Add("@CourseCode", SqlDbType.VarChar, 50).Value = CourseInfo["courseCode"];
                deleteRequest.ExecuteNonQuery();

                conn.Close();

                return Ok("Eliminado");
            }
            catch
            {
                return BadRequest("Error al eliminar");
            }
        }

        [HttpPost]
        [Route("api/user/delete/subject")]
        public IHttpActionResult DeleteSubject([FromBody] JObject SubjectInfo)
        {
            try
            {
                conn.Open();
                SqlCommand deleteRequestCareer = conn.CreateCommand();
                deleteRequestCareer.CommandText = "EXEC sp_deleteSubject @SubjectName";
                deleteRequestCareer.Parameters.Add("@SubjectName", SqlDbType.VarChar, 50).Value = SubjectInfo["subjectName"];
                deleteRequestCareer.ExecuteNonQuery();

                conn.Close();

                return Ok("Eliminado");
            }
            catch
            {
                return BadRequest("Error al eliminar");
            }
        }

        [HttpPost]
        [Route("api/user/add/admin")]
        public IHttpActionResult AddAdmin([FromBody] JObject AdminInfo)
        {
            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddAdmin @Username, @_Password, @AdminName, @Email, @Campus";
                insertRequest.Parameters.Add("@Username", SqlDbType.VarChar, 10).Value = AdminInfo["username"];
                insertRequest.Parameters.Add("@_Password", SqlDbType.VarChar, 50).Value = AdminInfo["password"];
                insertRequest.Parameters.Add("@AdminName", SqlDbType.VarChar, 50).Value = AdminInfo["adminName"];
                insertRequest.Parameters.Add("@Email", SqlDbType.VarChar, 100).Value = AdminInfo["mail"];
                insertRequest.Parameters.Add("@Campus", SqlDbType.VarChar, 50).Value = AdminInfo["campus"];
                insertRequest.ExecuteNonQuery();
                conn.Close();

                return Ok("Agregado");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }

        [HttpPost]
        [Route("api/user/delete/admin")]
        public IHttpActionResult DeleteAdmin([FromBody] JObject AdminInfo)
        {
            try
            {
                conn.Open();
                SqlCommand deleteRequest = conn.CreateCommand();
                deleteRequest.CommandText = "EXEC sp_deleteAdmin @Username";
                deleteRequest.Parameters.Add("@Username", SqlDbType.VarChar, 10).Value = AdminInfo["username"];
                deleteRequest.ExecuteNonQuery();
                conn.Close();

                return Ok("Eliminado");
            }
            catch
            {
                return BadRequest("Error al eliminar");
            }
        }
    }
}
