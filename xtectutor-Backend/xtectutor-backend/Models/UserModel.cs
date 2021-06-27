
using System.Data.SqlClient;
using Newtonsoft.Json.Linq;
using System.Data;
using System.Collections.Generic;

namespace xtectutor_backend.Models
{
    public class UserModel
    {
        public JObject getCommentAmmout(SqlConnection conn, JObject StudentInfo)
        {

            conn.Open();
            SqlCommand selectRequest = conn.CreateCommand();
            selectRequest.CommandText = "EXEC sp_GetNumberOfCommentsByEntry @Username";
            selectRequest.Parameters.Add("@Username", SqlDbType.VarChar, 10).Value = StudentInfo["username"];
            selectRequest.ExecuteNonQuery();

            SqlDataReader data = selectRequest.ExecuteReader();


            JObject obj = new JObject();

            while (data.Read())
            {
                obj.Add(new JProperty (data.GetValue(0).ToString(), data.GetValue(1).ToString()));
            }
            data.Close();
            conn.Close();
            return obj;
        }

        public string[] getEntryElement(SqlConnection conn, JObject EntryInfo, string element)
        {

            conn.Open();
            SqlCommand selectRequest = conn.CreateCommand();
            selectRequest.CommandText = "EXEC sp_GetSelectedEntry" + element + " @EntryID";
            selectRequest.Parameters.Add("@EntryID", SqlDbType.VarChar, 50).Value = EntryInfo["EntryID"];
            selectRequest.ExecuteNonQuery();

            SqlDataReader data = selectRequest.ExecuteReader();


            List<string> elementList = new List<string>();

            while (data.Read())
            {
                elementList.Add(data.GetValue(0).ToString());
            }
            conn.Close();
            return elementList.ToArray();
        }
    }
}