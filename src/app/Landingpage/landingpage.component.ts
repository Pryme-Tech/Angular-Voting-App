import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  templateUrl: 'landingpage.component.html',
  styleUrls: ['landingpage.component.scss']
})

export class landingpageComponent implements OnInit{

  constructor(){

 }

 ngOnInit(){

 }

 ngAfterViewInit(){
  let a = document.querySelector('div#main') as HTMLElement

  let header = document.querySelector('header') as HTMLElement

    window.addEventListener('scroll',()=>{
      // alert(window.scrollY)
      if(window.scrollY > 99){
        header.classList.add('second')
      }

      else{
        // header.style.backgroundColor = 'transparent'
        header.classList.remove('second')
      }

    })

    // ...

    const testimonialsContainer = document.querySelector('.testimonials-container') as HTMLElement
const testimonial = document.querySelector('.testimonial') as HTMLElement
// const userImage = document.querySelector('.user-image') as HTML
const username = document.querySelector('.username') as HTMLElement
const role = document.getElementById('role') as HTMLElement

const testimonials = [
  {
    name: 'Miyah Myles',
    position: 'Miyah Groups',
    photo:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
    text:
      "I appreciate how this is user friendly and made our student cultural group election fair without any bias. I cannot express how awesome this application was as a first time user.",
  },
  {
    name: 'June Cha',
    position: 'ACME CORPS',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    text:
      'It is the best online election platform I have ever seen. I really enjoyed working on it.',
  },
  {
    name: 'Iida Niskanen',
    position: 'Habatua sims',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    text:
      "I appreciate how this is user friendly and made our student cultural group election fair without any bias. I cannot express how awesome this application was as a first time user.",
  },
  {
    name: 'Renee Sims',
    position: 'Ray Organs',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    text:
      "Our election went well. The tool is easy to use and the price was right. We needed to extend the election over the weekend and support promptly replied and was able to help us. Great tool!",
  },
  {
    name: 'Jonathan Nunfiez',
    position: 'Designers hub',
    photo: 'https://randomuser.me/api/portraits/men/43.jpg',
    text:
      "I was so happy with my first transaction with Election Runner! I made a couple of mistakes me their customer service dept was so nice and all about the customer! Wouldn't even think of using anyone else! A+++",
  },
  {
    name: 'Sasha Ho',
    position: 'School of Chartered Accountants SRC',
    photo:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
    text:
      'I used this app for a union election for a mid sized law office with a very difficult to please group of people. I found the app easy to use. The support team was excellent and prompt. Would highly recommend as a low cost and simple way to hold an election',
  },
  {
    name: 'Veeti Seppanen',
    position: 'SRC Dominion University College',
    photo: 'https://randomuser.me/api/portraits/men/97.jpg',
    text:
      "provides a clean, attractive and easy-to-use voter interface that runs well on all Internet-enabled devices that we've tested. Their support system is unparalleled for the speedy, comprehensive and personal manner in which it is delivered. With a few test elections under our belt, we were totally sold.",
  },
]

let idx = 1

function updateTestimonial() {
  const { name, position, photo, text } = testimonials[idx]

  testimonial.innerHTML = text
  // userImage.src = photo
  username.innerHTML = name
  role.innerText = position

  idx++

  if (idx > testimonials.length - 1) {
    idx = 0
  }
}

setInterval(updateTestimonial, 5000)

// ..

 }

}