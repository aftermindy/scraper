<h1>Scraper</h1>

######### Required ###

1.Node
2.Git
3.Postman or POST interface
4.Account on Pracuj.pl

######### Instalation ###

1.Clone repo : git clone https://github.com/aftermindy/scraper.git</br>
2.Install npm dependencies: npm i

######### Usage ###

1.Type: npm run start </br>
2.Our server listen on localhost:3000 </br>
3.To send POST u need to go on localhost:3000/api/checkjobs/ endpoint </br>
4.Make sure have account on Pracuj.pl </br>
5.Send data in JSON {"email":"EXAMPLE_EMAIL","password":"EXAMPLE_PASS"} </br>
6.In respond u get 100 recommend jobs offers(name_offer,company,location,Expiration_date,Aplicationlink)</br>
