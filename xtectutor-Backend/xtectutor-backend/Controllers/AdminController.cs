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
        static string stringconnection = @"Data Source=MELI\SQLEXPRESS;Initial Catalog=xtectutor;Integrated Security=True";
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

        [HttpPost]
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
    }
}
