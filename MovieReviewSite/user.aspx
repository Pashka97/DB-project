<%@ Page Title="User Info" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="user.aspx.cs" Inherits="MovieReviewSite.Contact" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <br />
    <asp:Label ID="LabelUser" runat="server" Text="UserName"></asp:Label>
    <asp:TextBox ID="TextBoxUname" runat="server"></asp:TextBox>

    <br />
    <asp:Label ID="LabelPass" runat="server" Text="Password"></asp:Label>
    <asp:TextBox ID="TextBoxPass" runat="server" TextMode="Password"></asp:TextBox>

     <br />
    <asp:Button ID="ButtonLogIn" runat="server" Text="LogIn" />
    <asp:Button ID="ButtonSignUp" runat="server" Text="SignUp" />

</asp:Content>
