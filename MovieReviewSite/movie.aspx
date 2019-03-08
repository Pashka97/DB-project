<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="movie.aspx.cs" Inherits="MovieReviewSite.About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2>Movie Name Goes Here</h2>
    
    <!--  User Comment    -->
    <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
    <asp:Button ID="Button1" runat="server" Text="Submit" />

    <!-- Used to display other users comments -->
    <asp:Table ID="TableMovies" runat="server"></asp:Table>
</asp:Content>
