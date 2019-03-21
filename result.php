<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <title>BDF_RESULTS ☺!!!</title>
    <link rel="stylesheet" href="css/addon/style.css" />
    <!-- Bootstrap Core CSS -->
    <link href="css/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->


    <link href="css/lib/owl.theme.default.min.css" rel="stylesheet" />
    <link href="css/helper.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:** -->
    <!--[if lt IE 9]>
    <script src="https:**oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https:**oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>

<body class="fix-header fix-sidebar">
    <!-- Preloader - style you can find in spinners.css -->
    <div class="preloader">
        <svg class="circular" viewBox="25 25 50 50">
			<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>
    </div>
    <!-- Main wrapper  -->
    <div id="main-wrapper">
        
        <!-- Left Sidebar  -->
        <div class="left-sidebar">
            <!-- Sidebar scroll-->
            <div class="scroll-sidebar">
                <!-- Sidebar navigation-->
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <li class="nav-devider"></li>
                        <li class="nav-label">Best Delivery Path</li>
                        <li> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-book"></i><span class="hide-menu">MENU <span class="label label-rouded label-primary pull-right">4 actions</span></span></a>
                        </li>
                    </ul>
                </nav>
                <!-- End Sidebar navigation -->
            </div>
            <!-- End Sidebar scroll-->
        </div>
        <!-- End Left Sidebar  -->
        <!-- Page wrapper  -->
        <div class="page-wrapper" >
            <!-- Bread crumb -->
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-primary">BDP_ Technovore Hackathon 2019</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Best Delivery Path (BDP)</a></li>
                        <li class="breadcrumb-item active">Implémentation de l'algorithme REINFORCED LEARNING</li>
                    </ol>
                </div>
            </div>
            <!-- End Bread crumb -->
            <!-- Container fluid  -->
            <div class="container-fluid">
                <div class="card card-outline-info">
                            <div class="card-header">
                                <h4 class="m-b-0 text-white">Résultats</h4>
                            </div>
            
              </div>
              <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-8">
              <div class="card card-outline-info">
                <h5 class="text-primary">
                    <?php 
                        if(isset($_POST['nbNodes'])){
                            $a=$_POST['nbNodes'];
                            if ($a==10) 
                            {
                                if (shell_exec('C:\Users\USER\AppData\Local\Programs\Python\Python35\python.exe main.py main.py --task vrp10 --is_train False --model_dir C:\Users\USER\Desktop\VRP-RL\logs\vrp10-2019-03-02_14-33-10\model')) 
                                {
                                  $fh=fopen('C:\Users\USER\Desktop\VRP-RL\logs\vrp10-2019-03-02_14-44-47\results.txt', 'r');
                                  while (!feof($fh))
                                   {
                                     $line=fgets($fh);
                                     echo $line;
                                     fclose($fh)
                                   } 
                                }
                                else {echo "Le chargement du model, pour afficher les résultats, va prendre assez de temps avant de répondre. ☺";}
                            }
                            elseif ($a==20) 
                            {
                                if (shell_exec('C:\Users\USER\AppData\Local\Programs\Python\Python35\python.exe main.py main.py --task vrp20 --is_train False --model_dir C:\Users\USER\Desktop\VRP-RL\logs\vrp20-2019-03-02_15-37-11\model')) 
                                {
                                  $fh=fopen('C:\Users\USER\Desktop\VRP-RL\logs\vrp20-2019-03-02_16-25-18\results.txt', 'r');
                                  while (!feof($fh))
                                   {
                                     $line=fgets($fh);
                                     echo $line;
                                     fclose($fh)
                                   } 
                                }
                                else {echo "Le chargement du model, pour afficher les résultats, va prendre assez de temps avant de répondre. ☺";}
                            }
                            elseif ($a==50)
                            {
                                if (shell_exec('C:\Users\USER\AppData\Local\Programs\Python\Python35\python.exe main.py main.py --task vrp50 --is_train False --model_dir C:\Users\USER\Desktop\VRP-RL\logs\vrp50-2019-03-02_15-48-08\model')) 
                                {
                                  $fh=fopen('C:\Users\USER\Desktop\VRP-RL\logs\vrp50-2019-03-02_16-26-52\results.txt', 'r');
                                  while (!feof($fh))
                                   {
                                     $line=fgets($fh);
                                     echo $line;
                                     fclose($fh)
                                   } 
                                }
                                else {echo "Le chargement du model, pour afficher les résultats, va prendre assez de temps avant de répondre. ☺";}
                            }
                        }
                        else{
                            echo "<script>alert(\"La variable caractéristiques est nulle!! pfff...\")</script>";
                        }
                        ?>

                </h5>
                

                      
                    </div>
                  </div>
                    <div class="col-md-2">                       
                        
                    </div>
                </div>
            

           </div>
           <footer class="footer">2019 © Best Delivery Path. Tous les droits leur sont réservés. <span class="label label-rouded label-primary pull-right">Développé par Jordan Adopo, Aminata Coulibaly et Bakary... ☺</span></footer>
           </div>
            <!-- End Container fluid  -->
            <!-- footer -->
            
            <!-- End footer -->
        
        <!-- End Page wrapper  -->
   
    <!-- End Wrapper -->
    <!-- All Jquery -->
    <script src="js/lib/jquery/jquery.min.js"></script>
    <!-- Bootstrap tether Core JavaScript -->
    <script src="js/lib/bootstrap/js/popper.min.js"></script>
    <script src="js/lib/bootstrap/js/bootstrap.min.js"></script>
    <!-- slimscrollbar scrollbar JavaScript -->
    <script src="js/jquery.slimscroll.js"></script>
    <!--Menu sidebar -->
    <script src="js/sidebarmenu.js"></script>
    <!--stickey kit -->
    <script src="js/lib/sticky-kit-master/dist/sticky-kit.min.js"></script>
    <!--Custom JavaScript -->


    <!-- Amchart -->
     <script src="js/lib/morris-chart/raphael-min.js"></script>
    <script src="js/lib/morris-chart/morris.js"></script>
    <script src="js/lib/morris-chart/dashboard1-init.js"></script>


	<script src="js/lib/calendar-2/moment.latest.min.js"></script>
    <!-- scripit init-->
    <script src="js/lib/calendar-2/semantic.ui.min.js"></script>
    <!-- scripit init-->
    <script src="js/lib/calendar-2/prism.min.js"></script>
    <!-- scripit init-->
    <script src="js/lib/calendar-2/pignose.calendar.min.js"></script>
    <!-- scripit init-->
    <script src="js/lib/calendar-2/pignose.init.js"></script>

    <script src="js/lib/owl-carousel/owl.carousel.min.js"></script>
    <script src="js/lib/owl-carousel/owl.carousel-init.js"></script>
    <script src="js/scripts.js"></script>
    <!-- scripit init-->

    <script src="js/custom.min.js"></script>
    

</body>

</html>