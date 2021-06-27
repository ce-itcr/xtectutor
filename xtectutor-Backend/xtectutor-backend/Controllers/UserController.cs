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
        static string stringconnection = @"Data Source=MELI\SQLEXPRESS;Initial Catalog=xtectutor;Integrated Security=True";
        //static string stringconnection = @"Data Source=DESKTOP-FOUQTL8\SQLEXPRESS;Initial Catalog=xtectutor;Integrated Security=True";
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
                string visibilityType = "";
                string visibilityColor = "";

                if (data.GetValue(0).ToString() == "pública")
                {
                    visibilityType = "fa fa-eye";
                    visibilityColor = "btn-primary";
                } else
                {
                    visibilityType = "fa fa-eye-slash";
                    visibilityColor = "non-color";
                }

                JObject StudentEntry = new JObject(
                new JProperty("visibility", data.GetValue(0).ToString()),
                new JProperty("visibilityType", visibilityType),
                new JProperty("visibilityColor", visibilityColor),
                new JProperty("creationDate", data.GetValue(1).ToString()),
                new JProperty("creationHour", data.GetValue(2).ToString()),
                new JProperty("lastUpdate", data.GetValue(3).ToString()),
                new JProperty("updateHour", data.GetValue(4).ToString()),
                new JProperty("views", data.GetValue(5).ToString()),
                new JProperty("rating", data.GetValue(6).ToString()),
                new JProperty("title", data.GetValue(7).ToString()),
                new JProperty("description", data.GetValue(8).ToString()),
                new JProperty("career", data.GetValue(9).ToString()),
                new JProperty("course", data.GetValue(10).ToString()),
                new JProperty("subject", data.GetValue(11).ToString()),
                new JProperty("comments", AmountOfComments[data.GetValue(12).ToString()])
                );
                obj.Add(StudentEntry);
            }
            data.Close();
            conn.Close();
            return obj;
        }

        [HttpPost]
        [Route("api/user/add/entry")]
        public IHttpActionResult userAddEntry([FromBody] JObject EntryInfo)
        {

            string EntryID = EntryInfo["username"] + "-" + EntryInfo["creationDate"] + "-" + EntryInfo["creationHour"];
            try
            {
                conn.Open();
                SqlCommand insertRequest = conn.CreateCommand();
                insertRequest.CommandText = "EXEC sp_AddEntry @EntryID, @Visibility, @CreationDate, @CreationHour, @LastUpdate, @UpdateHour, @NumberOfViews, @Rating, @Title, @_Description, @_Entry, @CareerName, @CourseCode, @SubjectName";
                insertRequest.Parameters.Add("@EntryID", SqlDbType.VarChar, 50).Value = EntryID;
                insertRequest.Parameters.Add("@Visibility", SqlDbType.VarChar, 50).Value = EntryInfo["visibility"];
                insertRequest.Parameters.Add("@CreationDate", SqlDbType.Date).Value = EntryInfo["creationDate"];
                insertRequest.Parameters.Add("@CreationHour", SqlDbType.Time).Value = EntryInfo["creationHour"];
                insertRequest.Parameters.Add("@LastUpdate", SqlDbType.Date).Value = EntryInfo["lastUpdate"];
                insertRequest.Parameters.Add("@UpdateHour", SqlDbType.Time).Value = EntryInfo["updateHour"];
                insertRequest.Parameters.Add("@NumberOfViews", SqlDbType.Int).Value = EntryInfo["views"];
                insertRequest.Parameters.Add("@Rating", SqlDbType.Float).Value = EntryInfo["rating"];
                insertRequest.Parameters.Add("@Title", SqlDbType.VarChar, 100).Value = EntryInfo["title"];
                insertRequest.Parameters.Add("@_Description", SqlDbType.VarChar, 500).Value = EntryInfo["description"];
                insertRequest.Parameters.Add("@_Entry", SqlDbType.VarChar, Int32.MaxValue).Value = EntryInfo["entry"];
                insertRequest.Parameters.Add("@CareerName", SqlDbType.VarChar, 50).Value = EntryInfo["career"];
                insertRequest.Parameters.Add("@CourseCode", SqlDbType.VarChar, 50).Value = EntryInfo["course"];
                insertRequest.Parameters.Add("@SubjectName", SqlDbType.VarChar, 50).Value = EntryInfo["subject"];
                insertRequest.Parameters.Add("@Username", SqlDbType.VarChar, 10).Value = EntryInfo["username"];
                insertRequest.ExecuteNonQuery();
                conn.Close();

                foreach(var coauthor in EntryInfo["coauthors"])
                {
                    conn.Open();
                    insertRequest = conn.CreateCommand();
                    insertRequest.CommandText = "EXEC sp_AddCoauthor @Coauthor, @EntryID";
                    insertRequest.Parameters.Add("@EntryID", SqlDbType.VarChar, 50).Value = EntryID;
                    insertRequest.Parameters.Add("@Coauthor", SqlDbType.VarChar, 10).Value = coauthor;

                    insertRequest.ExecuteNonQuery();
                    conn.Close();
                }
                foreach (var media in EntryInfo["media"])
                {
                    conn.Open();
                    insertRequest = conn.CreateCommand();
                    insertRequest.CommandText = "EXEC sp_AddMedia @Media, @EntryID";
                    insertRequest.Parameters.Add("@EntryID", SqlDbType.VarChar, 50).Value = EntryID;
                    insertRequest.Parameters.Add("@Media", SqlDbType.VarChar, Int32.MaxValue).Value = media;

                    insertRequest.ExecuteNonQuery();
                    conn.Close();
                }


                return Ok("Agregado");
            }
            catch
            {
                return BadRequest("Error al insertar");
            }
        }
    }
}
