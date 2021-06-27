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
using xtectutor_backend.Models;

namespace xtectutor_backend.Controllers
{
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]

    public class UserController : ApiController
    {
        //static string stringconnection = @"Data Source=DESKTOP-RCFSH5R\MSSQLSERVER05;Initial Catalog=xtectutor;Integrated Security=True";
        //static string stringconnection = @"Data Source=MELI\SQLEXPRESS;Initial Catalog=xtectutor;Integrated Security=True";
        static string stringconnection = @"Data Source=DESKTOP-FOUQTL8\SQLEXPRESS;Initial Catalog=xtectutor;Integrated Security=True";
        SqlConnection conn = new SqlConnection(stringconnection);

        Models.UserModel userModel = new Models.UserModel();

        [HttpPost]
        [Route("api/user/get/info")]
        public JArray getUserInfo([FromBody] JObject UserInfo)
        {

            conn.Open();
            SqlCommand selectRequest = conn.CreateCommand();
            selectRequest.CommandText = "EXEC sp_GetUserInfo @Username";
            selectRequest.Parameters.Add("@Username", SqlDbType.VarChar, 10).Value = UserInfo["username"];
            selectRequest.ExecuteNonQuery();

            SqlDataReader data = selectRequest.ExecuteReader();
            JArray obj = new JArray();

            while (data.Read())
            {
                JObject TYSUserInfo = new JObject(
                new JProperty("username", data.GetValue(0).ToString()),
                new JProperty("password", data.GetValue(1).ToString()),
                new JProperty("userType", data.GetValue(2).ToString()),
                new JProperty("fullName", data.GetValue(3).ToString()),
                new JProperty("mail", data.GetValue(4).ToString()),
                new JProperty("campus", data.GetValue(5).ToString())
                );
                obj.Add(TYSUserInfo);
            }
            data.Close();
            conn.Close();
            return obj;
        }

        [HttpPost]
        [Route("api/user/get/entries")]
        public JArray getStudentEntries([FromBody] JObject StudentInfo)
        {

            JObject AmountOfComments = userModel.getCommentAmmout(conn, StudentInfo);

            conn.Open();
            SqlCommand selectRequest = conn.CreateCommand();
            selectRequest.CommandText = "EXEC sp_GetStudentEntries @Username";
            selectRequest.Parameters.Add("@Username", SqlDbType.VarChar, 10).Value = StudentInfo["username"];
            selectRequest.ExecuteNonQuery();

            SqlDataReader data = selectRequest.ExecuteReader();


            JArray obj = new JArray();

            while (data.Read())
            {
                Debug.Print(data.GetValue(11).ToString());
                JObject StudentEntry = new JObject(
                new JProperty("visibility", data.GetValue(0).ToString()),
                new JProperty("creationDate", data.GetValue(1).ToString()),
                new JProperty("creationHour", data.GetValue(2).ToString()),
                new JProperty("lastUpdate", data.GetValue(3).ToString()),
                new JProperty("updateHour", data.GetValue(4).ToString()),
                new JProperty("views", data.GetValue(5).ToString()),
                new JProperty("rating", data.GetValue(6).ToString()),
                new JProperty("title", data.GetValue(7).ToString()),
                new JProperty("_description", data.GetValue(8).ToString()),
                new JProperty("CareerName", data.GetValue(9).ToString()),
                new JProperty("CourseCode", data.GetValue(10).ToString()),
                new JProperty("SubjectName", data.GetValue(11).ToString()),
                new JProperty("comments", AmountOfComments[data.GetValue(12).ToString()])
                );
                obj.Add(StudentEntry);
            }
            data.Close();
            conn.Close();
            return obj;
        }
    }
}
