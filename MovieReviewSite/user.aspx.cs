using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MovieReviewSite
{
    public partial class Contact : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ButtonLogIn.Click += ButtonLogIn_Click;
            ButtonSignUp.Click += ButtonSignUp_Click;
        }

        //LogIn code
        void ButtonLogIn_Click(Object sender, EventArgs e)
        {

        }

        //SignUp code
        void ButtonSignUp_Click(Object sender, EventArgs e)
        {

        }

    }
}