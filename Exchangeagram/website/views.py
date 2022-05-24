from flask import Blueprint, redirect, render_template, request, flash, url_for
from flask_login import login_required, current_user
from .models import User, Post, Comment
from . import db

views = Blueprint("views", __name__)


@views.route("/")
@views.route("/home")
@login_required
def home():
    posts = Post.query.all()
    return render_template("home.html", user=current_user, posts=posts)


@views.route("/create-post", methods=['GET', 'POST'])
@login_required
def create_post():
    if request.method == 'POST':
        title = request.form.get('title')
        text = request.form.get('text')

        if not text:
            flash('Post cannot be empty.', category='error')
        else:
            post = Post(title=title, text=text, author=current_user.id)
            db.session.add(post)
            db.session.commit()
            flash('Post created!', category='success')
            return redirect(url_for('views.home'))

    return render_template('create_post.html', user=current_user)

@views.route("/edit-post/<id>", methods=['GET', 'POST'])
@login_required
def edit_post(id):
    edit_post = Post.query.filter_by(id=id).first()
    comments = edit_post.comments

    if not edit_post:
        flash('Post does not exist.', category='error')
        return redirect(url_for('views.home'))
    elif current_user.id != edit_post.author:
        flash('You do not have permission to edit this post.', category='error')
        return redirect(url_for('views.home'))

    if request.method == 'POST':
        title = request.form.get('title')
        text = request.form.get('text')

        if not text:
            flash('Post cannot be empty.', category='error')
        else:
            edit_post.title = title
            edit_post.text = text
            db.session.commit()
            flash('Post edited!', category='success')
            return redirect(url_for('views.home'))

    title = edit_post.title
    text = edit_post.text
    return render_template('edit_post.html', user=current_user, title=title, text=text)

@views.route("/delete-post/<id>")
@login_required
def delete_post(id):
    post = Post.query.filter_by(id=id).first()

    if not post:
        flash('Post does not exist.', category='error')
    elif current_user.id != post.author:
        flash('You do not have permission to delete this post.', category='error')
    else:
        db.session.delete(post)
        db.session.commit()
        flash('Post deleted.', category='success')

    return redirect(url_for('views.home'))

@views.route("/profile/<username>")
@login_required
def profile(username):
    user = User.query.filter_by(username=username).first()

    if not user:
        flash('No user with that username exists.', category='error')
        return redirect(url_for('views.home'))
    
    email = user.email
    date_created = user.date_created
    return render_template("profile.html", user=user, username=username, email=email, date_created=date_created)

@views.route("/posts/<username>")
@login_required
def posts(username):
    user = User.query.filter_by(username=username).first()

    if not user:
        flash('No user with that username exists.', category='error')
        return redirect(url_for('views.home'))
    
    posts = user.posts
    return render_template("posts.html", user=current_user, posts=posts, username=username)

@views.route("/create-comment/<post_id>", methods=['POST'])
@login_required
def create_comment(post_id):
    text = request.form.get('text')

    if not text:
        flash('Comment cannot be empty.', category='error')
    else:
        post = Post.query.filter_by(id=post_id)
        if post:
            comment = Comment(text=text, author=current_user.id, post_id=post_id)
            db.session.add(comment)
            db.session.commit()
        else:
            flash('Post does not exist', category='error')
    
    return redirect(url_for('views.home'))

@views.route("/delete-comment/<comment_id>")
@login_required
def delete_comment(comment_id):
    comment = Comment.query.filter_by(id=comment_id).first()

    if not comment:
        flash('Comment does not exist.', category='error')
    elif current_user.id != comment.author and current_user.id != comment.post.author:
        flash('You do not have permission to delete this comment.', category='error')
    else:
        db.session.delete(comment)
        db.session.commit()

    return redirect(url_for('views.home'))

@views.route("/delete-user/<id>")
@login_required
def delete_user(id):
    user = User.query.filter_by(id=id).first()

    if not user:
        flash('Comment does not exist.', category='error')
    elif current_user.id != user.id:
        flash('You do not have permission to delete this comment.', category='error')
    else:
        db.session.delete(user)
        db.session.commit()
        flash("Successfully deleted User!", category='success')

    return redirect(url_for('views.home'))
